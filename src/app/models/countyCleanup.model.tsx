import { BulkyItemModel } from './';
import { EventModel } from './event.model';

export interface CountyCleanupModel extends EventModel {
    tireCount: number;
    paintCanAndHouseholdChemicalCount: number;
    otherBulkyItems: BulkyItemModel[];
    otherBulkyItemPounds: number;
}