import { EventModel } from './event.model';

export interface TrashRoutesModel extends EventModel {
    trashPounds: number;
    recyclingPounds: number;
}