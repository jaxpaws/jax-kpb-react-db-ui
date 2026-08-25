import { EventDAO } from './';
import { EventEntity } from '../../entities/event.entity';
import { TrashRoutesEventEntity } from '../../entities/trashRoutesEvent.entity';
import { EventModel } from '../../models';
import { isTrashRoutesEvent } from '../../utils/eventTypeGuards';
import { insertTrashRoutesEvent, updateTrashRoutesEvent } from '../../lib/event.sql';

export class TrashRoutesEventDAO implements EventDAO {
    getById(id: number): EventEntity | null {
        return null;
    }

    async save(event: EventModel, isUpdate: boolean): Promise<void> {
        if (isTrashRoutesEvent(event)) {
            const eventEntity: TrashRoutesEventEntity = {
                id: event.id ? event.id : -1,
                date: event.date,
                trashLbs: event.trashPounds,
                recyclingLbs: event.recyclingPounds
            };

            if (isUpdate) {
                // TODO: Implement UPDATE method
                await updateTrashRoutesEvent(eventEntity);
            } else {
                await insertTrashRoutesEvent(eventEntity);
            }
        } else {
            console.error(`Error in save(): invalid data did not adhere to TrashRoutesModel.`);
        }
    }

    delete(id: number): void {

    }
}