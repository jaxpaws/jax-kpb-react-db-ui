import { ReferenceDataDAO } from '.';
import { ReferenceDataEntity } from '../../entities/referenceData/referenceData.entity';
import { ReferenceDataModel } from '../../models/referenceData.model';
import { getCleanupLocationById, getCleanupLocationReference, insertCleanupLocation } from '../../lib/referenceData.sql';

export class CleanupLocationReferenceDataDAO implements ReferenceDataDAO {
    async getByCode(code: number | string): Promise<ReferenceDataEntity | null> {
        let id: number = -1;
        if (typeof code !== 'number' && Number.isNaN(Number(code))) {
            return null;
        } else {
            id = Number(code);
        }
        const result: any = await getCleanupLocationById(id);
        if (result && result.length >= 1) {
            return { code: result[0].code, description: result[0].description };
        }
        return null;
    }

    async getAll(): Promise<ReferenceDataEntity[]> {
        const result: any = await getCleanupLocationReference();
        let locations: ReferenceDataEntity[] = [];
        if (result && result.length >= 1) {
            result.forEach((location: any) => locations.push({ code: location.id, description: location.location }));
        }
        return locations;
    }

    async save(refData: ReferenceDataModel): Promise<number> {
        console.log('Saving...');
        return -1;
    }

    delete(code: number | string): void {

    }
}