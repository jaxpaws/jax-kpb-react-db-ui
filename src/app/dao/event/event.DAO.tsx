import { EventEntity } from '../../entities/event/event.entity';
import { EventModel } from '../../models/event/event.model';

export interface EventDAO {
    getById(id: number): Promise<EventEntity | null>;
    save(event: EventModel, isUpdate: boolean): Promise<void>;
    delete(id: number): void;
}