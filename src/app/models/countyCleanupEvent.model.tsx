import { BulkyItemModel } from '.';
import { EventModel } from './event.model';

export interface CountyCleanupEventModel extends EventModel {
    tireCount: number;
    paintCanAndHouseholdChemicalCount: number;
    otherBulkyItems: BulkyItemModel[];
    otherBulkyItemPounds: number;
}