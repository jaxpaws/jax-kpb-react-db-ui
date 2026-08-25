import { ReferenceDataModel } from './referenceData.model';
import { CountyCleanupEventModel } from './countyCleanupEvent.model';

export interface CountyCleanupsBulkyItemModel {
    id: number;
    bulkyItem: ReferenceDataModel;
    countyCleanup: CountyCleanupEventModel;
    quantity: number;
}