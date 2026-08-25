import { EventEntity } from './event.entity';

export interface CleanTeamEventEntity extends EventEntity {
    eventDesc: string;
    trashLbs: number;
    recyclingLbs: number;
}