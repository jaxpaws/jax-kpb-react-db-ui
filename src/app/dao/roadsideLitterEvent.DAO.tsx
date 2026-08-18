import { EventDAO } from './eventIndex';
import { EventEntity } from '../entities/event.entity';
import { EventModel } from '../models/event.model';
import RoadsideLitterEntity from '../entities/roadsideLitterEvent.entity';

export class RoadsideLitterEventDAO implements EventDAO {
    getById(id: number): EventEntity | null {
        return null;
    }

    save(event: EventModel): void {
        
    }

    delete(id: number): void {

    }
}