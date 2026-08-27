import { EventModel } from './event.model';

export interface TrashRoutesEventModel extends EventModel {
    trashPounds: number;
    recyclingPounds: number;
}