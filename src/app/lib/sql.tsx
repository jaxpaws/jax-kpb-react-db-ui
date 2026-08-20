'use server'

import Cleanup from '../models/cleanup';
import { retry } from '../utils/retry';
import Contact from '@/src/app/models/contact';
import { getConnection, closeConnection } from '@/src/app/lib/database-connector';
import { QueryResult } from 'mysql2/promise';
import { DistrictEntity } from '../entities/district.entity';
import { BulkyItemEntity } from '../entities/bulkyItem.entity';
import { RoadsideLitterEntity } from '../entities/roadsideLitterEvent.entity';
import { CleanTeamEntity } from '../entities/cleanTeam.entity';

export async function testConnection() {
    const conn = await getConnection();
    const [result] = await conn.query(`SELECT 'True' AS connected;`);
    console.table(result); // prints returned time value from server
    await conn.release();
}

export async function getBulkyItemsReference(): Promise<QueryResult> {
    try {
        const conn = await getConnection();
        const [result] = await conn.query(
            'SELECT id, description FROM bulky_items_reference ' +
            'WHERE start_date <= CURDATE() ' +
            'AND (end_date IS NULL OR end_date >= CURDATE()) ' +
            'ORDER BY description ASC'
        );
        await conn.release();
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

export async function insertCleanTeamEvent(event: CleanTeamEntity): Promise<any> {
    let conn = null;
    try {
        conn = await getConnection();
        const [result]: any = await conn.execute(
            'INSERT INTO clean_team_events (date, event_desc, trash_lbs, recycling_lbs) ' +
            'VALUES (?, ?, ?, ?)',
            [ event.date, event.eventDesc, event.trashLbs, event.recyclingLbs ]
        );
        conn.release();
        return result.insertId;
    } catch (err) {
        console.error(`Error: Unable to insert Clean Team event: ${err}`);
    }
}

export async function insertRoadsideLitterEvent(event: RoadsideLitterEntity, districts: DistrictEntity[], bulkyItems: BulkyItemEntity[]): Promise<any> {
    let conn = null;
    try {
        conn = await getConnection();
        await conn.query('START TRANSACTION');
        const [result]: any = await conn.execute(
            'INSERT INTO roadside_litter_cleanups (date, litter_lbs, recycling_lbs, locations) ' +
            'VALUES (?, ?, ?, ?)',
            [ event.date, event.litterLbs, event.recyclingLbs, event.locations ]
        );
        if (result && result.insertId) {
            let districtValuePlaceholders: string = '';
            let districtValues: any[] = [];
            districts.map((district) => {
                districtValuePlaceholders += ' (?, ?),';
                districtValues.push(result.insertId); // TODO: Make this the event id
                districtValues.push(district.districtCode);
            });
            await conn.execute(
                'INSERT INTO roadside_litter_districts (roadside_litter_cleanup_id, district_code) ' +
                `VALUES${districtValuePlaceholders.slice(0, -1)}`,
                districtValues
            );
            let bulkyItemValuePlaceholders: string = '';
            let bulkyItemValues: any[] = [];
            bulkyItems.map((item) => {
                bulkyItemValuePlaceholders += ' (?, ?, ?),';
                bulkyItemValues.push(item.bulkyItemRefId);
                bulkyItemValues.push(result.insertId); // TODO: Make this the event id
                bulkyItemValues.push(item.quantity);
            });
            await conn.execute(
                'INSERT INTO roadside_litter_bulky_items (bulky_item_ref_id, roadside_litter_cleanup_id, quantity) ' +
                `VALUES${bulkyItemValuePlaceholders.slice(0, -1)}`,
                bulkyItemValues
            );
        }
        await conn.query('COMMIT');
        conn.release();
        return result.insertId;
    } catch (err) {
        console.error(`Error: Unable to insert Roadside Litter event: ${err}`);
        if (conn) {
            conn.query('ROLLBACK');
        }
    }
}

export async function updateCleanTeamEvent(event: CleanTeamEntity): Promise<any> {
    let conn = null;
    try {
        conn = await getConnection();
        //await conn.query('START TRANSACTION');
        const [result]: any = await conn.execute(
            'INSERT INTO clean_team_events (date, event_desc, trash_lbs, recycling_lbs) ' +
            'VALUES (?, ?, ?, ?)',
            [ event.date, event.eventDesc, event.trashLbs, event.recyclingLbs ]
        );
        //await conn.query('COMMIT');
        conn.release();
        return result.insertId;
    } catch (err) {
        console.error(`Error: Unable to insert Roadside Litter event: ${err}`);
        // if (conn) {
        //     conn.query('ROLLBACK');
        // }
    }
}

export async function updateRoadsideLitterEvent(event: RoadsideLitterEntity, districts: DistrictEntity[], bulkyItems: BulkyItemEntity[]): Promise<void> {
    let conn = null;
    try {
        conn = await getConnection();
        await conn.execute('START TRANSACTION');
        const [result] = await conn.execute(
            'UPDATE roadside_litter_cleanups (date, litter_lbs, recycling_lbs, locations) ' +
            'OUTPUT INSERTED.id' +
            'VALUES (?, ?, ?, ?)',
            [ event.date, event.litterLbs, event.recyclingLbs, event.locations ]
        );
        console.log(result);
        await conn.execute('COMMIT');
        conn.release();
    } catch (err) {
        console.error(`Error while executing query to insert Roadside Litter event`);
        if (conn) {
            conn.execute('ROLLBACK');
        }
    }
}

export async function insertCleanupWithContact(cleanup: Cleanup, contact: Contact) {
    try {
        const conn = await getConnection();
        await retry(async () => {
            const [result] = await conn.query(
                'CALL insert_cleanup_with_contact(?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
                [
                    contact.email, cleanup.date, cleanup.organization, cleanup.litter, cleanup.volunteerCount,
                    cleanup.hours, contact.fName, '', contact.lName, contact.phoneNum
                ]
            );
            console.log(result);
        },
        {
            attempts: 3,
            baseDelay: 200,
            onRetry: ({ attempt, delay }) => {
                console.log(`Retry ${attempt} in ${Math.round(delay)}ms...`)
            }
        });
        await conn.release();
    } catch (err) {
        console.error(`Error while executing query: ${err}`);
    }
}

  
/*
export async function query() {
    try {
        //const connectionString = `Server=${config.server},1433;Database=${config.database};User Id=${config.user};Password=${config.password};Encrypt=true`
        return retry(
            async () => {
                await sql.connect(config)
                .then(async (pool: any) => {
                    console.log('Successful connect!');
                    let result = await pool.request()
                        .input('email_param', sql.VarChar(50), 'dwaynejohnson@gmail.com')
                        .query(`SELECT * FROM dbo.contacts WHERE email = @email_param`);
                    console.log(result.recordset);
                    //return await pool.query(`SELECT * FROM dbo.contacts WHERE email = 'jacksonbare@gmail.com'`);
                    return null;
                }).catch((err: any) => {
                    if (err) {
                        console.log(`Unsuccessful connect: "${err}"`);
                        throw err;
                    }
                });
            },
            {
                attempts: 10,
                baseDelay: 2000,
                onRetry: ({ attempt, delay }) => {
                    console.log(`Retry ${attempt} in ${Math.round(delay)}ms...`)
                }
            }
        );
        
        //return { body: JSON.stringify({ "text": result.recordsets.length })};
        // Execute query
        // const result = await sql.query`
        //     SELECT * FROM dbo.contacts WHERE email = ${NEXT_PUBLIC_USER_EMAIL};
        // `;
        //return { body: JSON.stringify({ "text": result.recordsets.length })};
    } catch (error) {
      console.log(`error! ${error}`)
        // context.log.error(error);
        // context.res = {
        //     status: 500,
        //     body: {
        //         error: error.message
        //     }
        // };
    }
}
*/

/*
export async function insertIntoCleanupsTable(row: CleanupsTable) {
    return retry(
        async () => {
            return await sql.connect(config)
            .then(async (pool: any) => {
                let result = await pool.request()
                    .input('date_param', sql.Date, row.date)
                    .input('organization_param', sql.VarChar(50), row.organization)
                    .input('litter_param', sql.TinyInt, row.litter)
                    .input('volunteer_count_param', sql.TinyInt, row.volunteerCount)
                    .input('hours_param', sql.TinyInt, row.hours)
                    .input('cid_param', sql.UniqueIdentifier, row.cid)
                    .query(`
                        INSERT INTO dbo.cleanups (date, organization, litter_lbs, volunteer_count, hours, cid)
                        OUTPUT INSERTED.id
                        VALUES (@date_param, @organization_param, @litter_param, @volunteer_count_param, @hours_param, @cid_param)
                    `);
                //return await pool.query(`SELECT * FROM dbo.contacts WHERE email = 'jacksonbare@gmail.com'`);
                return result.recordset[0].id;
            }).catch((err: any) => {
                if (err) {
                    console.log(`Unsuccessful connect: "${err}"`);
                    throw err;
                }
            });
        },
        {
            attempts: 5,
            baseDelay: 2000,
            onRetry: ({ attempt, delay }) => {
                console.log(`Retry ${attempt} in ${Math.round(delay)}ms...`)
            }
        }
    );
}
*/

/*
export async function insertIntoContactsTable(row: ContactsTable) {
    return retry(
        async () => {
            return await sql.connect(config)
            .then(async (pool: any) => {
                let result = await pool.request()
                    .input('fname_param', sql.VarChar(25), row.contactFName)
                    .input('lname_param', sql.VarChar(25), row.contactLName)
                    .input('email_param', sql.VarChar(50), row.contactEmail)
                    .input('phone_param', sql.VarChar(10), row.contactPhoneNum)
                    .query(`
                        INSERT INTO dbo.contacts (fname, lname, email, phone) 
                        OUTPUT INSERTED.cid
                        VALUES (@fname_param, @lname_param, @email_param, @phone_param)
                    `);
                console.log(result.recordset[0].cid);
                //return await pool.query(`SELECT * FROM dbo.contacts WHERE email = 'jacksonbare@gmail.com'`);
                return result.recordset[0].cid;
            }).catch((err: any) => {
                if (err) {
                    console.log(`Unsuccessful connect: "${err}"`);
                    throw err;
                }
            });
        },
        {
            attempts: 5,
            baseDelay: 2000,
            onRetry: ({ attempt, delay }) => {
                console.log(`Retry ${attempt} in ${Math.round(delay)}ms...`)
            }
        }
    );
}
*/