import { EventDAO } from './';
import { EventEntity } from '../../entities/event/event.entity';
import { GroupCleanupEventEntity } from '../../entities/event/groupCleanupEvent.entity';
import { EventModel } from '../../models';
import { isGroupCleanupEvent } from '../../utils/eventTypeGuards';
import { insertGroupCleanupEvent, updateGroupCleanupEvent } from '../../lib/event.sql';

export class GroupCleanupEventDAO implements EventDAO {
    async getById(id: number): Promise<EventEntity | null> {
        return null;
    }

    async save(event: EventModel, isUpdate: boolean): Promise<number> {
        if (isGroupCleanupEvent(event)) {
            const locationId: number = Number.isNaN(Number(event.location.code)) ? -1 : Number(event.location.code);
            const organizationId: number = event.organization.id ? event.organization.id : -1;
            if (locationId === -1 || organizationId === -1) {
                console.error(`Error in save(): no valid location or organization for Group Cleanup.`);
                return -1;
            }
            const eventEntity: GroupCleanupEventEntity = {
                id: event.id ? event.id : -1,
                date: event.date,
                organizationId: organizationId,
                locationId: locationId,
                volunteerCount: event.volunteerCount,
                volunteerHours: event.volunteerHours,
                litterLbs: event.litterCollected,
                recyclingLbs: event.recyclingCollected
            };

            if (isUpdate) {
                return await updateGroupCleanupEvent(eventEntity);
            } else {
                return await insertGroupCleanupEvent(eventEntity);
            }
        } else {
            console.error(`Error in save(): invalid data did not adhere to GroupCleanupModel.`);
        }
        return -1;
    }

    delete(id: number): void {
        console.log('Deleting');
    }
}