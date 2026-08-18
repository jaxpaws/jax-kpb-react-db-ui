import { ReferenceDataModel } from './referenceData.model';
import { EventModel } from './event.model';

export interface RoadsideLitterModel extends EventModel {
    litterPounds: number;
    recyclingPounds: number;
    locations: string;
    districts: ReferenceDataModel[];
    bulkyItems: ReferenceDataModel[];
};