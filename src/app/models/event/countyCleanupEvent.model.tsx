import { BulkyItemModel } from '../bulkyItem.model';
import { EventModel } from './event.model';

export interface CountyCleanupEventModel extends EventModel {
    tireCount: number;
    paintCanAndHouseholdChemicalCount: number;
    otherBulkyItems: BulkyItemModel[];
    otherBulkyItemPounds: number;
}