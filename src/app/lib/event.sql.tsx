import { getConnection, closeConnection } from '@/src/app/lib/database-connector';
import { AdoptASpotEventEntity } from '../entities/adoptASpotEvent.entity';
import { BulkyItemEntity } from '../entities/bulkyItem.entity';
import { CleanTeamEventEntity } from '../entities/cleanTeamEvent.entity';
import { CountyCleanupEventEntity } from '../entities/countyCleanupEvent.entity';
import { DistrictEntity } from '../entities/district.entity';
import { RoadsideLitterEventEntity } from '../entities/roadsideLitterEvent.entity';
import { TrashRoutesEventEntity } from '../entities/trashRoutesEvent.entity';

export async function insertAdoptASpotEvent(event: AdoptASpotEventEntity): Promise<number> {
    let conn = null;
    try {
        conn = await getConnection();
        const [result]: any = await conn.execute(
            'INSERT INTO adopt_a_spot_cleanups (assignment_id, date, volunteer_count, volunteer_hours, litter_lbs, recycling_lbs) ' +
            'VALUES (?, ?, ?, ?, ?, ?)',
            [ event.assignmentId, event.date, event.volunteerCount, event.volunteerHours, event.litterLbs, event.recyclingLbs ]
        );
        conn.release();
        return result.insertId;
    } catch (err) {
        console.error(`Error: Unable to insert Adopt-a-Spot event: ${err}`);
        return -1;
    }
}

export async function insertCleanTeamEvent(event: CleanTeamEventEntity): Promise<number> {
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
        return -1;
    }
}

export async function insertCountyCleanupEvent(event: CountyCleanupEventEntity, bulkyItems: BulkyItemEntity[]): Promise<number> {
    let conn = null;
    try {
        conn = await getConnection();
        await conn.query('START TRANSACTION');
        const [result]: any = await conn.execute(
            'INSERT INTO county_cleanups (date, tire_count, tire_lbs, ' +
                'paint_can_and_household_chemical_count, paint_can_and_household_chemical_lbs, ' +
                'bulky_items_lbs) ' +
            'VALUES (?, ?, ?, ?, ?, ?)',
            [ 
                event.date, event.tireCount, event.tireLbs,
                event.paintCanAndHouseholdChemicalCount, event.paintCanAndHouseholdChemicalLbs,
                event.bulkyItemsLbs
            ]
        );
        if (result && result.insertId && bulkyItems.length > 0) {
            let bulkyItemValuePlaceholders: string = '';
            let bulkyItemValues: any[] = [];
            bulkyItems.map((item) => {
                bulkyItemValuePlaceholders += ' (?, ?, ?),';
                bulkyItemValues.push(item.bulkyItemRefId);
                bulkyItemValues.push(result.insertId);
                bulkyItemValues.push(item.quantity);
            });
            await conn.execute(
                'INSERT INTO county_cleanups_bulky_items (bulky_item_ref_id, county_cleanup_id, quantity) ' +
                `VALUES${bulkyItemValuePlaceholders.slice(0, -1)}`,
                bulkyItemValues
            );
        }
        await conn.query('COMMIT');
        conn.release();
        return result.insertId;
    } catch (err) {
        console.error(`Error: Unable to insert County Cleanup event: ${err}`);
        if (conn) {
            conn.query('ROLLBACK');
        }
        return -1;
    }
}

export async function insertRoadsideLitterEvent(event: RoadsideLitterEventEntity, districts: DistrictEntity[], bulkyItems: BulkyItemEntity[]): Promise<number> {
    let conn = null;
    try {
        conn = await getConnection();
        await conn.query('START TRANSACTION');
        const [result]: any = await conn.execute(
            'INSERT INTO roadside_litter_cleanups (date, litter_lbs, recycling_lbs, locations) ' +
            'VALUES (?, ?, ?, ?)',
            [ event.date, event.litterLbs, event.recyclingLbs, event.locations ]
        );
        if (result && result.insertId  && (districts.length > 0 || bulkyItems.length > 0)) {
            if (districts.length > 0) {
                let districtValuePlaceholders: string = '';
                let districtValues: any[] = [];
                districts.map((district) => {
                    districtValuePlaceholders += ' (?, ?),';
                    districtValues.push(result.insertId);
                    districtValues.push(district.districtCode);
                });
                await conn.execute(
                    'INSERT INTO roadside_litter_districts (roadside_litter_cleanup_id, district_code) ' +
                    `VALUES${districtValuePlaceholders.slice(0, -1)}`,
                    districtValues
                );
            }
            if (bulkyItems.length > 0) {
                let bulkyItemValuePlaceholders: string = '';
                let bulkyItemValues: any[] = [];
                bulkyItems.map((item) => {
                    bulkyItemValuePlaceholders += ' (?, ?, ?),';
                    bulkyItemValues.push(item.bulkyItemRefId);
                    bulkyItemValues.push(result.insertId);
                    bulkyItemValues.push(item.quantity);
                });
                await conn.execute(
                    'INSERT INTO roadside_litter_bulky_items (bulky_item_ref_id, roadside_litter_cleanup_id, quantity) ' +
                    `VALUES${bulkyItemValuePlaceholders.slice(0, -1)}`,
                    bulkyItemValues
                );
            }
        }
        await conn.query('COMMIT');
        conn.release();
        return result.insertId;
    } catch (err) {
        console.error(`Error: Unable to insert Roadside Litter event: ${err}`);
        if (conn) {
            conn.query('ROLLBACK');
        }
        return -1;
    }
}

export async function insertTrashRoutesEvent(event: TrashRoutesEventEntity): Promise<number> {
    let conn = null;
    try {
        conn = await getConnection();
        const [result]: any = await conn.execute(
            'INSERT INTO trash_can_routes (date, trash_lbs, recycling_lbs) ' +
            'VALUES (?, ?, ?)',
            [ event.date, event.trashLbs, event.recyclingLbs ]
        );
        conn.release();
        return result.insertId;
    } catch (err) {
        console.error(`Error: Unable to insert Trash Routes event: ${err}`);
        return -1;
    }
}

// TODO: Implement UPDATE logic
export async function updateAdoptASpotEvent(event: AdoptASpotEventEntity): Promise<number> {
    let conn = null;
    try {
        conn = await getConnection();
        const [result]: any = await conn.execute(
            'INSERT INTO adopt_a_spot_cleanups (assignment_id, date, volunteer_count, volunteer_hours, litter_lbs, recycling_lbs) ' +
            'VALUES (?, ?, ?, ?, ?, ?)',
            [ event.assignmentId, event.date, event.volunteerCount, event.volunteerHours, event.litterLbs, event.recyclingLbs ]
        );
        conn.release();
        return result.insertId;
    } catch (err) {
        console.error(`Error: Unable to insert Adopt-a-Spot event: ${err}`);
        return -1;
    }
}

// TODO: Implement UPDATE logic
export async function updateCleanTeamEvent(event: CleanTeamEventEntity): Promise<any> {
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

// TODO: Implement UPDATE logic
export async function updateCountyCleanupEvent(event: CountyCleanupEventEntity, bulkyItems: BulkyItemEntity[]): Promise<any> {
    let conn = null;
    try {
        conn = await getConnection();
        await conn.query('START TRANSACTION');
        const [result]: any = await conn.execute(
            'INSERT INTO county_cleanups (date, tire_count, tire_lbs, ' +
                'paint_can_and_household_chemical_count, paint_can_and_household_chemical_lbs, ' +
                ' bulky_item_lbs) ' +
            'VALUES (?, ?, ?, ?, ?, ?)',
            [ 
                event.date, event.tireCount, event.tireLbs,
                event.paintCanAndHouseholdChemicalCount, event.paintCanAndHouseholdChemicalLbs,
                event.bulkyItemsLbs
            ]
        );
        if (result && result.insertId) {
            let bulkyItemValuePlaceholders: string = '';
            let bulkyItemValues: any[] = [];
            bulkyItems.map((item) => {
                bulkyItemValuePlaceholders += ' (?, ?, ?),';
                bulkyItemValues.push(item.bulkyItemRefId);
                bulkyItemValues.push(result.insertId); // TODO: Make this the event id
                bulkyItemValues.push(item.quantity);
            });
            await conn.execute(
                'INSERT INTO county_cleanups_bulky_items (bulky_item_ref_id, county_cleanup_id, quantity) ' +
                `VALUES${bulkyItemValuePlaceholders.slice(0, -1)}`,
                bulkyItemValues
            );
        }
        await conn.query('COMMIT');
        conn.release();
        return result.insertId;
    } catch (err) {
        console.error(`Error: Unable to insert County Cleanup event: ${err}`);
        if (conn) {
            conn.query('ROLLBACK');
        }
    }
}

// TODO: Implement UPDATE logic
export async function updateRoadsideLitterEvent(event: RoadsideLitterEventEntity, districts: DistrictEntity[], bulkyItems: BulkyItemEntity[]): Promise<void> {
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
        await conn.execute('COMMIT');
        conn.release();
    } catch (err) {
        console.error(`Error while executing query to insert Roadside Litter event`);
        if (conn) {
            conn.execute('ROLLBACK');
        }
    }
}

// TODO: Implement UPDATE logic
export async function updateTrashRoutesEvent(event: TrashRoutesEventEntity): Promise<any> {
    let conn = null;
    try {
        conn = await getConnection();
        const [result]: any = await conn.execute(
            'INSERT INTO trash_can_routes (date, trash_lbs, recycling_lbs) ' +
            'VALUES (?, ?, ?)',
            [ event.date, event.trashLbs, event.recyclingLbs ]
        );
        conn.release();
        return result.insertId;
    } catch (err) {
        console.error(`Error: Unable to insert Trash Routes event: ${err}`);
    }
}