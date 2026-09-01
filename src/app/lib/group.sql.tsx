import { getConnection, closeConnection } from '@/src/app/lib/database-connector';
import { QueryResult } from 'mysql2/promise';
import { GroupEntity } from '../entities/group/group.entity';
import { AdoptASpotGroupEntity } from '../entities/group/adoptASpotGroup.entity';

export async function getAdoptASpotAssignmentById(id: number): Promise<QueryResult> {
    try {
        const conn = await getConnection();
        const [result] = await conn.execute(
            'SELECT id, group_name, location FROM adopt_a_spot_assignments ' +
            'WHERE start_date <= CURDATE() ' +
            'AND (end_date IS NULL OR end_date >= CURDATE()) ' +
            'AND id = ?',
            [ id ]
        );
        conn.release();
        return result;
    } catch (err) {
        console.error(`Error: Unable to get Adopt-a-Spot Assignment by ID (id=${id}): ${err}`);
        return [];
    }
}

export async function getAdoptASpotAssignments(): Promise<QueryResult> {
    try {
        const conn = await getConnection();
        const [result] = await conn.execute(
            'SELECT id, group_name, location FROM adopt_a_spot_assignments ' +
            'WHERE start_date <= CURDATE() ' +
            'AND (end_date IS NULL OR end_date >= CURDATE()) ' +
            'ORDER BY location ASC'
        );
        conn.release();
        return result;
    } catch (err) {
        console.error(`Error: Unable to get Adopt-a-Spot Assignments: ${err}`);
        return [];
    }
}

export async function getCleanupOrganizationById(id: number): Promise<QueryResult> {
    try {
        const conn = await getConnection();
        const [result] = await conn.execute(
            'SELECT id, name FROM organizations ' +
            'WHERE start_date <= CURDATE() ' +
            'AND (end_date IS NULL OR end_date >= CURDATE()) ' +
            'AND id = ?',
            [ id ]
        );
        conn.release();
        return result;
    } catch (err) {
        console.error(`Error: Unable to get Group Cleanup Organization by ID (id=${id}): ${err}`);
        return [];
    }
}

export async function getCleanupOrganizations(): Promise<QueryResult> {
    try {
        const conn = await getConnection();
        const [result] = await conn.execute(
            'SELECT id, name FROM organizations ' +
            'WHERE start_date <= CURDATE() ' +
            'AND (end_date IS NULL OR end_date >= CURDATE()) ' +
            'ORDER BY name ASC'
        );
        conn.release();
        return result;
    } catch (err) {
        console.error(`Error: Unable to get Group Cleanup Organizations: ${err}`);
        return [];
    }
}

export async function getEducationRecipientById(id: number): Promise<QueryResult> {
    try {
        const conn = await getConnection();
        const [result] = await conn.execute(
            'SELECT id, name FROM education_recipients ' +
            'WHERE start_date <= CURDATE() ' +
            'AND (end_date IS NULL OR end_date >= CURDATE()) ' +
            'AND id = ?',
            [ id ]
        );
        conn.release();
        return result;
    } catch (err) {
        console.error(`Error: Unable to get Education Recipient by ID (id=${id}): ${err}`);
        return [];
    }
}

export async function getEducationRecipients(): Promise<QueryResult> {
    try {
        const conn = await getConnection();
        const [result] = await conn.execute(
            'SELECT id, name FROM education_recipients ' +
            'WHERE start_date <= CURDATE() ' +
            'AND (end_date IS NULL OR end_date >= CURDATE()) ' +
            'ORDER BY name ASC'
        );
        conn.release();
        return result;
    } catch (err) {
        console.error(`Error: Unable to get Education Recipients: ${err}`);
        return [];
    }
}

export async function insertEducationRecipient(recipient: GroupEntity): Promise<number> {
    try {
        const conn = await getConnection();
        const [result]: any = await conn.execute(
            'INSERT INTO education_recipients (education_recipients.name) ' +
            'VALUES (?)',
            [ recipient.name ]
        );
        conn.release();
        return result.insertId ? result.insertId : -1;
    } catch (err) {
        console.error(`Error: Unable to insert Education Recipient (name=${recipient.name}): ${err}`);
        return -1;
    }
}

export async function insertAdoptASpotAssignment(assignment: AdoptASpotGroupEntity): Promise<number> {
    try {
        const conn = await getConnection();
        const [result]: any = await conn.execute(
            'INSERT INTO adopt_a_spot_assignments (group_name, location) ' +
            'VALUES (?, ?)',
            [ assignment.name, assignment.location ]
        );
        conn.release();
        return result.insertId ? result.insertId : -1;
    } catch (err) {
        console.error(`Error: Unable to insert Adopt-a-Spot Assignment (groupName=${assignment.name}, location=${assignment.location}): ${err}`);
        return -1;
    }
}

export async function insertCleanupOrganization(organization: GroupEntity): Promise<number> {
    try {
        const conn = await getConnection();
        const [result]: any = await conn.execute(
            'INSERT INTO organizations (organizations.name) ' +
            'VALUES (?)',
            [ organization.name ]
        );
        conn.release();
        return result.insertId ? result.insertId : -1;
    } catch (err) {
        console.error(`Error: Unable to insert Group Cleanup Organization (name=${organization.name}): ${err}`);
        return -1;
    }
}