import { BulkyItemModel, DistrictModel } from './';
import { EventModel } from './event.model';

export interface RoadsideLitterModel extends EventModel {
    litterPounds: number;
    recyclingPounds: number;
    locations: string;
    districts: DistrictModel[];
    bulkyItems: BulkyItemModel[];
};