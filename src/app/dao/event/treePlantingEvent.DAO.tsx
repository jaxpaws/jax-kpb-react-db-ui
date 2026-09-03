import { EventDAO } from './event.DAO';
import { EventModel } from '../../models';
import { TreePlantingEventEntity } from '../../entities/event/treePlantingEvent.entity';
import { EventEntity } from '../../entities/event/event.entity';
import { isTreePlantingEvent } from '../../utils/eventTypeGuards';
import { insertTreePlantingEvent, updateTreePlantingEvent } from '../../lib/event.sql';

export class TreePlantingEventDAO implements EventDAO {
    async getById(id: number): Promise<EventEntity | null> {
        return null;
    }

    async save(event: EventModel, isUpdate: boolean): Promise<number> {
        if (isTreePlantingEvent(event)) {
            const eventEntity: TreePlantingEventEntity = {
                id: event.id ? event.id : -1,
                date: event.date,
                treeCount: event.treesPlanted,
                eventDesc: event.eventDescription,
                volunteerCount: event.volunteerCount,
                volunteerHours: event.volunteerHours
            };

            if (isUpdate) {
                return await updateTreePlantingEvent(eventEntity);
            } else {
                return await insertTreePlantingEvent(eventEntity);
            }
        } else {
            console.error(`Error in save(): invalid data did not adhere to TreePlantingEventModel.`);
        }
        return -1;
    }

    delete(id: number): void {
        console.log('Deleting');
    }
}