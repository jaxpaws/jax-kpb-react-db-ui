import { ReferenceDataDAO } from '.';
import { ReferenceDataEntity } from '../../entities/referenceData.entity';
import { ItemWeightReferenceDataEntity } from '../../entities/itemWeightReferenceData.entity';
import { ReferenceDataModel } from '../../models/referenceData.model';
import { getItemWeightReference } from '../../lib/sql';

export class ItemWeightReferenceDataDAO implements ReferenceDataDAO {
    async getByCode(code: number | string): Promise<ReferenceDataEntity | null> {
        return null;
    }

    async getAll(): Promise<ItemWeightReferenceDataEntity[]> {
        const result: any = await getItemWeightReference();
        let itemWeights: ItemWeightReferenceDataEntity[] = [];
        if (result && result.length >= 1) {
            result.forEach((itemWeight: any) => itemWeights.push({
                code: itemWeight.code,
                description: itemWeight.description,
                weight: itemWeight.weight
            }));
        }
        return itemWeights;
    }

    save(event: ReferenceDataModel): void {
        
    }

    delete(code: number | string): void {

    }
}