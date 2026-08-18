import { EventEntity } from './event.entity';

export default interface RoadsideLitterEntity extends EventEntity {
    litterLbs: number;
    recyclingLbs: number;
    locations: string;
}