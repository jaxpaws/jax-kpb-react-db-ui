import { getConnection, closeConnection } from '@/src/app/lib/database-connector';
import { QueryResult } from 'mysql2/promise';

export async function getBulkyItemsReference(): Promise<QueryResult> {
    try {
        const conn = await getConnection();
        const [result] = await conn.query(
            'SELECT id, description FROM bulky_items_reference ' +
            'WHERE start_date <= CURDATE() ' +
            'AND (end_date IS NULL OR end_date >= CURDATE()) ' +
            'ORDER BY description ASC'
        );
        conn.release();
        return result;
    } catch (err) {
        console.error(`Error while executing query: ${err}`);
        return [];
    }
}

export async function getDistrictReference(): Promise<QueryResult> {
    try {
        const conn = await getConnection();
        const [result] = await conn.execute(
            'SELECT code, description FROM district_reference ' +
            'WHERE start_date <= CURDATE() ' +
            'AND (end_date IS NULL OR end_date >= CURDATE()) ' +
            'ORDER BY description ASC'
        );
        conn.release();
        console.log(result);
        return result;
    } catch (err) {
        console.error(`Error while executing query: ${err}`);
        return [];
    }
}

export async function getItemWeightReference(): Promise<QueryResult> {
    try {
        const conn = await getConnection();
        const [result] = await conn.query(
            'SELECT code, weight, description FROM item_weights_reference ' +
            'WHERE start_date <= CURDATE() ' +
            'AND (end_date IS NULL OR end_date >= CURDATE())'
        );
        conn.release();
        return result;
    } catch (err) {
        console.error(`Error while executing query: ${err}`);
        return [];
    }
}