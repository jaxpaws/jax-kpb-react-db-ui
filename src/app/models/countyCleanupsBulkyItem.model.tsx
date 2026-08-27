import { ReferenceDataModel } from './referenceData.model';
import { CountyCleanupEventModel } from './event/countyCleanupEvent.model';

export interface CountyCleanupsBulkyItemModel {
    id: number;
    bulkyItem: ReferenceDataModel;
    countyCleanup: CountyCleanupEventModel;
    quantity: number;
}