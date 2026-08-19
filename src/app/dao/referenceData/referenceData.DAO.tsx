import { ReferenceDataEntity } from '../../entities/referenceData.entity';
import { ReferenceDataModel } from '../../models/referenceData.model';

export interface ReferenceDataDAO {
    getByCode(code: number | string): Promise<ReferenceDataEntity | null>;
    getAll(): Promise<ReferenceDataEntity[]>;
    save(event: ReferenceDataModel): void;
    delete(code: number | string): void;
}