const sql = require('mssql');
import CleanupsTable from '../models/cleanupsTable';
import { retry } from '../utils/retry';
import ContactsTable from '@/src/models/contactsTable';


const config = {
    server: process.env['DB_SERVER'],
    database: process.env['DB_DATABASE'],
    user: process.env['DB_USER'],
    password: process.env['DB_PASS'],
    pool: {
        max: 5,
        min: 0
    },
    options: {
        encrypt: true,
        trustServerCertificate: false
    }
};

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

export async function queryDb() {
  const result = await sql.query`SELECT * FROM dbo.contacts WHERE email = 'jacksonbare@gmail.com'`;
  console.log(result);
}

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