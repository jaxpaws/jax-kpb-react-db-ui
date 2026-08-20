import { EventEntity } from './event.entity';

export interface CountyCleanupEntity extends EventEntity {
    tireCount: number;
    tireLbs: number;
    paintCanAndHouseholdChemicalCount: number;
    paintCanAndHouseholdChemicalLbs: number;
    bulkyItemsLbs: number;
}