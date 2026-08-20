import { EventDAO } from './';
import { EventEntity } from '../../entities/event.entity';
import { CleanTeamEntity } from '../../entities/cleanTeam.entity';
import { EventModel } from '../../models';
import { isCleanTeamEvent } from '../../utils/eventTypeGuards';
import { insertCleanTeamEvent, updateCleanTeamEvent } from '../../lib/sql';

export class CleanTeamEventDAO implements EventDAO {
    getById(id: number): EventEntity | null {
        return null;
    }

    async save(event: EventModel, isUpdate: boolean): Promise<void> {
        console.log(event);
        console.log(isCleanTeamEvent(event));
        if (isCleanTeamEvent(event)) {
            const eventEntity: CleanTeamEntity = {
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