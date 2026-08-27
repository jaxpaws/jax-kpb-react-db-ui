import { EventEntity } from './event.entity';

export interface TrashRoutesEventEntity extends EventEntity {
    trashLbs: number;
    recyclingLbs: number;
}