import { EventDAO } from './';
import { EventEntity } from '../../entities/event/event.entity';
import { AdoptASpotEventEntity } from '../../entities/event/adoptASpotEvent.entity';
import { EventModel } from '../../models';
import { isAdoptASpotEvent } from '../../utils/eventTypeGuards';
import { insertAdoptASpotEvent, updateAdoptASpotEvent } from '../../lib/event.sql';

export class AdoptASpotEventDAO implements EventDAO {
    async getById(id: number): Promise<EventEntity | null> {
        return null;
    }

    async save(event: EventModel, isUpdate: boolean): Promise<void> {
        if (isAdoptASpotEvent(event)) {
            const eventEntity: AdoptASpotEventEntity = {
                id: event.id ? event.id : -1,
                date: event.date,
                assignmentId: event.spot.id ? event.spot.id : -1,
                volunteerCount: event.volunteerCount,
                volunteerHours: event.volunteerHours,
                litterLbs: event.litterCollected,
                recyclingLbs: event.recyclingCollected
            };

            if (isUpdate) {
                // TODO: Implement UPDATE method
                await updateAdoptASpotEvent(eventEntity);
            } else {
                await insertAdoptASpotEvent(eventEntity);
            }
        } else {
            console.error(`Error in save(): invalid data did not adhere to AdoptASpotModel.`);
        }
    }

    delete(id: number): void {

    }
}