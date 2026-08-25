import { ReferenceDataModel } from './referenceData.model';
import { RoadsideLitterEventModel } from './roadsideLitterEvent.model';

export interface RoadsideLitterBulkyItemModel {
    id: number;
    bulkyItem: ReferenceDataModel;
    roadsideLitter: RoadsideLitterEventModel;
    quantity: number;
}