import { EventEntity } from './event.entity';

export interface RoadsideLitterEventEntity extends EventEntity {
    litterLbs: number;
    recyclingLbs: number;
    locations: string;
}