import { EventEntity } from './event.entity';

export interface CleanTeamEntity extends EventEntity {
    eventDesc: string;
    trashLbs: number;
    recyclingLbs: number;
}