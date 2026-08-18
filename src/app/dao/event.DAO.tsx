import { EventEntity } from '../entities/event.entity';
import { EventModel } from '../models/event.model';

export interface EventDAO {
    getById(id: number): EventEntity | null;
    save(event: EventModel): void;
    delete(id: number): void;
}