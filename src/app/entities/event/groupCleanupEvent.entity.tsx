import { EventEntity } from './event.entity';

export interface GroupCleanupEventEntity extends EventEntity {
    organizationId: number;
    locationId: number;
    volunteerCount: number;
    volunteerHours: number;
    litterLbs: number;
    recyclingLbs: number;
}