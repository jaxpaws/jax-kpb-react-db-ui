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

    async save(event: EventModel, isUpdate: boolean): Promise<number> {
        if (isAdoptASpotEvent(event)) {
            const assignmentId: number = event.spot.id ? event.spot.id : -1;
            if (assignmentId === -1) {
                console.error(`Error in save(): no valid assignment for Adopt-a-Spot Cleanup.`);
                return -1;
            }
            const eventEntity: AdoptASpotEventEntity = {
                id: event.id ? event.id : -1,
                date: event.date,
                assignmentId: assignmentId,
                volunteerCount: event.volunteerCount,
                volunteerHours: event.volunteerHours,
                litterLbs: event.litterCollected,
                recyclingLbs: event.recyclingCollected
            };

            if (isUpdate) {
                return await updateAdoptASpotEvent(eventEntity);
            } else {
                return await insertAdoptASpotEvent(eventEntity);
            }
        } else {
            console.error(`Error in save(): invalid data did not adhere to AdoptASpotModel.`);
        }
        return -1;
    }

    delete(id: number): void {
        console.log('Deleting');
    }
}