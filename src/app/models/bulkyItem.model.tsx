import { ReferenceDataModel } from './';

export interface BulkyItemModel {
    id?: number;
    bulkyItemRef: ReferenceDataModel;
    quantity: number;
}