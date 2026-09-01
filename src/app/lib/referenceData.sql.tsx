import { getConnection, closeConnection } from '@/src/app/lib/database-connector';
import { QueryResult } from 'mysql2/promise';
import { ReferenceDataEntity } from '../entities/referenceData/referenceData.entity';

export async function getBulkyItemsReference(): Promise<QueryResult> {
    try {
        const conn = await getConnection();
        const [result] = await conn.execute(
            'SELECT id, description FROM bulky_items_reference ' +
            'WHERE start_date <= CURDATE() ' +
            'AND (end_date IS NULL OR end_date >= CURDATE()) ' +
            'ORDER BY description ASC'
        );
        conn.release();
        return result;
    } catch (err) {
        console.error(`Error: Unable to get Bulky Items: ${err}`);
        return [];
    }
}

export async function getCleanupLocationById(id: number): Promise<QueryResult> {
    try {
        const conn = await getConnection();
        const [result] = await conn.execute(
            'SELECT id, location FROM cleanup_locations ' +
            'WHERE start_date <= CURDATE() ' +
            'AND (end_date IS NULL OR end_date >= CURDATE()) ' +
            'AND id = ?',
            [ id ]
        );
        conn.release();
        return result;
    } catch (err) {
        console.error(`Error: Unable to get Cleanup Location by ID (id=${id}): ${err}`);
        return [];
    }
}

export async function getCleanupLocationReference(): Promise<QueryResult> {
    try {
        const conn = await getConnection();
        const [result] = await conn.execute(
            'SELECT id, location FROM cleanup_locations ' +
            'WHERE start_date <= CURDATE() ' +
            'AND (end_date IS NULL OR end_date >= CURDATE()) ' +
            'ORDER BY location ASC'
        );
        conn.release();
        return result;
    } catch (err) {
        console.error(`Error: Unable to get Cleanup Locations: ${err}`);
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
        return result;
    } catch (err) {
        console.error(`Error: Unable to get Districts: ${err}`);
        return [];
    }
}

export async function getEducationTopicReferenceById(id: number): Promise<QueryResult> {
    try {
        const conn = await getConnection();
        const [result] = await conn.execute(
            'SELECT id, topic FROM education_topics ' +
            'WHERE start_date <= CURDATE() ' +
            'AND (end_date IS NULL OR end_date >= CURDATE()) ' +
            'AND id = ?',
            [ id ]
        );
        conn.release();
        return result;
    } catch (err) {
        console.error(`Error: Unable to get Education Topic by ID (id=${id}): ${err}`);
        return [];
    }
}

export async function getEducationTopicReference(): Promise<QueryResult> {
    try {
        const conn = await getConnection();
        const [result] = await conn.execute(
            'SELECT id, topic FROM education_topics ' +
            'WHERE start_date <= CURDATE() ' +
            'AND (end_date IS NULL OR end_date >= CURDATE()) ' +
            'ORDER BY topic ASC'
        );
        conn.release();
        return result;
    } catch (err) {
        console.error(`Error: Unable to get Education Topics: ${err}`);
        return [];
    }
}

export async function getItemWeightReference(): Promise<QueryResult> {
    try {
        const conn = await getConnection();
        const [result] = await conn.execute(
            'SELECT code, weight, description FROM item_weights_reference ' +
            'WHERE start_date <= CURDATE() ' +
            'AND (end_date IS NULL OR end_date >= CURDATE())'
        );
        conn.release();
        return result;
    } catch (err) {
        console.error(`Error: Unable to get Item Weights: ${err}`);
        return [];
    }
}

export async function insertCleanupLocation(refDataEntity: ReferenceDataEntity): Promise<number> {
    try {
        const conn = await getConnection();
        const [result]: any = await conn.execute(
            'INSERT INTO cleanup_locations (location) ' +
            'VALUES (?)',
            [ refDataEntity.description ]
        );
        conn.release();
        return result.insertId ? result.insertId : -1;
    } catch (err) {
        console.error(`Error: Unable to insert Cleanup Location (location=${refDataEntity.description}): ${err}`);
        return -1;
    }
}

export async function insertEducationTopic(refDataEntity: ReferenceDataEntity): Promise<number> {
    try {
        const conn = await getConnection();
        const [result]: any = await conn.execute(
            'INSERT INTO education_topics (topic) ' +
            'VALUES (?)',
            [refDataEntity.description]
        );
        conn.release();
        return result.insertId ? result.insertId : -1;
    } catch (err) {
        console.error(`Error: Unable to insert Education Topic (topic=${refDataEntity.description}): ${err}`);
        return -1;
    }
}