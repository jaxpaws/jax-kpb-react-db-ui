import { ReferenceDataDAO } from '.';
import { ReferenceDataEntity } from '../../entities/referenceData.entity';
import { ReferenceDataModel } from '../../models/referenceData.model';
import { getCleanupLocationReference } from '../../lib/referenceData.sql';

export class CleanupLocationReferenceDataDAO implements ReferenceDataDAO {
    async getByCode(code: number | string): Promise<ReferenceDataEntity | null> {
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

    save(event: ReferenceDataModel): void {
        
    }

    delete(code: number | string): void {

    }
}