'use server'

import mysql from 'mysql2/promise';
import { AuthTypes, Connector, IpAddressTypes } from '@google-cloud/cloud-sql-connector';

let connector: Connector;
let pool: mysql.Pool;

const getInstanceConnName = () => {
    return !!process.env['DB_INSTANCE_CONN_NAME'] ? process.env['DB_INSTANCE_CONN_NAME'] : '';
}

const getIpType = () => {
  return process.env['PRIVATE_IP'] === '1' ? IpAddressTypes.PUBLIC : IpAddressTypes.PRIVATE;
}

const getAuthType = () => {
    return process.env['DB_AUTH_TYPE'] === 'IAM' ? AuthTypes.IAM : AuthTypes.PASSWORD;
}

const connectWithConnectorAutoIAMAuthn = async (config: any) => {
    connector = new Connector();
    const clientOpts = await connector.getOptions({
        instanceConnectionName: getInstanceConnName(),
        ipType: getIpType(),
        authType: getAuthType(),
    });
    pool = await mysql.createPool({
        ...clientOpts,
        user: process.env['IAM_DB_USER'],
        password: process.env['DB_AUTH_TYPE'] === 'PASSWORD' ? process.env['DB_PASS'] : undefined,
        database: process.env['DB_NAME']
    });
}

export const getConnection = async () => {
    if (!pool) {
        await connectWithConnectorAutoIAMAuthn({});
    }
    return await pool.getConnection();
}

export const closeConnection = async () => {
    if (!!pool) await pool.end();
    if (!!connector) connector.close();
}