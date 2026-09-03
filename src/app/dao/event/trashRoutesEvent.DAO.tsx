import { EventDAO } from './';
import { EventEntity } from '../../entities/event/event.entity';
import { TrashRoutesEventEntity } from '../../entities/event/trashRoutesEvent.entity';
import { EventModel } from '../../models';
import { isTrashRoutesEvent } from '../../utils/eventTypeGuards';
import { insertTrashRoutesEvent, updateTrashRoutesEvent } from '../../lib/event.sql';

export class TrashRoutesEventDAO implements EventDAO {
    async getById(id: number): Promise<EventEntity | null> {
        return null;
    }

    async save(event: EventModel, isUpdate: boolean): Promise<number> {
        if (isTrashRoutesEvent(event)) {
            const eventEntity: TrashRoutesEventEntity = {
                id: event.id ? event.id : -1,
                date: event.date,
                trashLbs: event.trashPounds,
                recyclingLbs: event.recyclingPounds
            };

            if (isUpdate) {
                return await updateTrashRoutesEvent(eventEntity);
            } else {
                return await insertTrashRoutesEvent(eventEntity);
            }
        } else {
            console.error(`Error in save(): invalid data did not adhere to TrashRoutesModel.`);
        }
        return -1;
    }

    delete(id: number): void {
        console.log('Deleting');
    }
}