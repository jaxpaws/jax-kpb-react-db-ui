import { EventDAO } from './';
import { EventEntity } from '../../entities/event/event.entity';
import { CleanTeamEventEntity } from '../../entities/event/cleanTeamEvent.entity';
import { EventModel } from '../../models';
import { isCleanTeamEvent } from '../../utils/eventTypeGuards';
import { insertCleanTeamEvent, updateCleanTeamEvent } from '../../lib/event.sql';

export class CleanTeamEventDAO implements EventDAO {
    async getById(id: number): Promise<EventEntity | null> {
        return null;
    }

    async save(event: EventModel, isUpdate: boolean): Promise<void> {
        if (isCleanTeamEvent(event)) {
            const eventEntity: CleanTeamEventEntity = {
                id: event.id ? event.id : -1,
                date: event.date,
                eventDesc: event.eventDescription,
                trashLbs: event.trashPounds,
                recyclingLbs: event.recyclingPounds
            };

            if (isUpdate) {
                // TODO: Implement UPDATE method
                await updateCleanTeamEvent(eventEntity);
            } else {
                await insertCleanTeamEvent(eventEntity);
            }
        } else {
            console.error(`Error in save(): invalid data did not adhere to CleanTeamModel.`);
        }
    }

    delete(id: number): void {

    }
}