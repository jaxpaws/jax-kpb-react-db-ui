import { EventDAO } from './';
import { BulkyItemEntity } from '../../entities/bulkyItem.entity';
import { CountyCleanupEntity } from '../../entities/countyCleanup.entity';
import { EventEntity } from '../../entities/event.entity';
import { ItemWeightReferenceDataEntity } from '../../entities/itemWeightReferenceData.entity';
import { BulkyItemModel, EventModel } from '../../models';
import { isCountyCleanupEvent } from '../../utils/eventTypeGuards';
import { insertCountyCleanupEvent, updateCountyCleanupEvent } from '../../lib/sql';
import { ItemWeightReferenceDataDAO } from '../referenceData';

export class CountyCleanupEventDAO implements EventDAO {
    private static TIRE_WEIGHT_CODE = 'TIRE';
    private static PAINT_CAN_HOUSEHOLD_CHEMICAL_WEIGHT_CODE = 'PCHC';

    getById(id: number): EventEntity | null {
        return null;
    }

    async save(event: EventModel, isUpdate: boolean): Promise<void> {
        if (isCountyCleanupEvent(event)) {
            const itemWeightDAO: ItemWeightReferenceDataDAO = new ItemWeightReferenceDataDAO();
            const itemWeights: ItemWeightReferenceDataEntity[] = await itemWeightDAO.getAll();
            let tireWeight: number = 1;
            let paintCanHouseholdChemicalWeight: number = 1;
            itemWeights.map((weight: ItemWeightReferenceDataEntity) => {
                if (weight.code === CountyCleanupEventDAO.TIRE_WEIGHT_CODE) {
                    tireWeight = weight.weight;
                } else if (weight.code === CountyCleanupEventDAO.PAINT_CAN_HOUSEHOLD_CHEMICAL_WEIGHT_CODE) {
                    paintCanHouseholdChemicalWeight = weight.weight;
                }
            });

            const eventEntity: CountyCleanupEntity = {
                id: event.id ? event.id : -1,
                date: event.date,
                tireCount: event.tireCount,
                tireLbs: event.tireCount * tireWeight,
                paintCanAndHouseholdChemicalCount: event.paintCanAndHouseholdChemicalCount,
                paintCanAndHouseholdChemicalLbs: event.paintCanAndHouseholdChemicalCount * paintCanHouseholdChemicalWeight,
                bulkyItemsLbs: event.otherBulkyItemPounds
            };

            let bulkyItemEntities: BulkyItemEntity[] = [];
            event.otherBulkyItems.map((item: BulkyItemModel) => {
                bulkyItemEntities.push({
                    id: item.id ? item.id : -1,
                    bulkyItemRefId: Number(item.bulkyItemRef.code),
                    eventId: event.id ? event.id : -1,
                    quantity: item.quantity
                });
            });

            if (isUpdate) {
                // TODO: Implement UPDATE method
                await updateCountyCleanupEvent(eventEntity, bulkyItemEntities);
            } else {
                await insertCountyCleanupEvent(eventEntity, bulkyItemEntities);
            }
        } else {
            console.error(`Error in save(): invalid data did not adhere to CountyCleanupModel.`);
        }
    }

    delete(id: number): void {

    }
}