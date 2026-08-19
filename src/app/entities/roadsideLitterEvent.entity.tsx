import { EventEntity } from './event.entity';

export interface RoadsideLitterEntity extends EventEntity {
    litterLbs: number;
    recyclingLbs: number;
    locations: string;
}