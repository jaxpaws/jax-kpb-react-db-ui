import { EventEntity } from './event.entity';

export interface TreePlantingEventEntity extends EventEntity {
    treeCount: number;
    eventDesc: string;
    volunteerCount: number;
    volunteerHours: number;
}