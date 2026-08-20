import { EventEntity } from './event.entity';

export interface TrashRoutesEntity extends EventEntity {
    trashLbs: number;
    recyclingLbs: number;
}