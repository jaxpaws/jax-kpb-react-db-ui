import { ReferenceDataModel } from './referenceData.model';
import { RoadsideLitterModel } from './roadsideLitter.model';

export interface RoadsideLitterBulkyItemModel {
    id: number;
    bulkyItem: ReferenceDataModel;
    roadsideLitter: RoadsideLitterModel;
    quantity: number;
}