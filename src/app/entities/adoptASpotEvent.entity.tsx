import { EventEntity } from './event.entity';

export interface AdoptASpotEventEntity extends EventEntity {
    assignmentId: number;
    volunteerCount: number;
    volunteerHours: number;
    litterLbs: number;
    recyclingLbs: number;
}