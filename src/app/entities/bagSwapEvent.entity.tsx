import { EventEntity } from './event.entity';

export interface BagSwapEventEntity extends EventEntity {
    bagCount: number;
    eventDesc: string;
    volunteerCount: number;
    volunteerHours: number;
}