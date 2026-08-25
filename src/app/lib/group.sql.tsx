import { getConnection, closeConnection } from '@/src/app/lib/database-connector';
import { QueryResult } from 'mysql2/promise';

export async function getAdoptASpotAssignmentById(id: number): Promise<QueryResult> {
    try {
        const conn = await getConnection();
        const [result] = await conn.query(
            'SELECT id, group_name, location FROM adopt_a_spot_assignments ' +
            'WHERE start_date <= CURDATE() ' +
            'AND (end_date IS NULL OR end_date >= CURDATE()) ' +
            'AND id = ?',
            [ id ]
        );
        conn.release();
        return result;
    } catch (err) {
        console.error(`Error while executing query: ${err}`);
        return [];
    }
}

export async function getAdoptASpotAssignments(): Promise<QueryResult> {
    try {
        const conn = await getConnection();
        const [result] = await conn.query(
            'SELECT id, group_name, location FROM adopt_a_spot_assignments ' +
            'WHERE start_date <= CURDATE() ' +
            'AND (end_date IS NULL OR end_date >= CURDATE()) ' +
            'ORDER BY location ASC'
        );
        conn.release();
        return result;
    } catch (err) {
        console.error(`Error while executing query: ${err}`);
        return [];
    }
}

export async function getCleanupOrganizations(): Promise<QueryResult> {
    try {
        const conn = await getConnection();
        const [result] = await conn.query(
            'SELECT id, name FROM organizations ' +
            'WHERE start_date <= CURDATE() ' +
            'AND (end_date IS NULL OR end_date >= CURDATE()) ' +
            'ORDER BY name ASC'
        );
        conn.release();
        return result;
    } catch (err) {
        console.error(`Error while executing query: ${err}`);
        return [];
    }
}