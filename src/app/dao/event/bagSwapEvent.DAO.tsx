import { EventDAO } from './event.DAO';
import { EventModel } from '../../models';
import { BagSwapEventEntity } from '../../entities/event/bagSwapEvent.entity';
import { EventEntity } from '../../entities/event/event.entity';
import { isBagSwapEvent } from '../../utils/eventTypeGuards';
import { insertBagSwapEvent, updateBagSwapEvent } from '../../lib/event.sql';

export class BagSwapEventDAO implements EventDAO {
    async getById(id: number): Promise<EventEntity | null> {
        return null;
    }

    async save(event: EventModel, isUpdate: boolean): Promise<number> {
        if (isBagSwapEvent(event)) {
            const eventEntity: BagSwapEventEntity = {
                id: event.id ? event.id : -1,
                date: event.date,
                bagCount: event.bagsCollected,
                eventDesc: event.eventDescription,
                volunteerCount: event.volunteerCount,
                volunteerHours: event.volunteerHours
            };

            if (isUpdate) {
                return await updateBagSwapEvent(eventEntity);
            } else {
                return await insertBagSwapEvent(eventEntity);
            }
        } else {
            console.error(`Error in save(): invalid data did not adhere to BagSwapEventModel.`);
        }
        return -1;
    }

    delete(id: number): void {
        console.log('Deleting');
    }
}