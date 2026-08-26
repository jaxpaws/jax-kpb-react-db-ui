import { ReferenceDataDAO } from '.';
import { ReferenceDataEntity } from '../../entities/referenceData.entity';
import { ReferenceDataModel } from '../../models/referenceData.model';
import { getEducationTopicReferenceById, getEducationTopicReference } from '../../lib/referenceData.sql';

export class EducationTopicReferenceDataDAO implements ReferenceDataDAO {
    async getByCode(code: number | string): Promise<ReferenceDataEntity | null> {
        let id: number = -1;
        if (typeof code !== 'number' && Number.isNaN(Number(code))) {
            return null;
        } else {
            id = Number(code);
        }
        const result: any = await getEducationTopicReferenceById(id);
        if (result && result.length >= 1) {
            return { code: result[0].id, description: result[0].topic };
        }
        return null;
    }

    async getAll(): Promise<ReferenceDataEntity[]> {
        const result: any = await getEducationTopicReference();
        console.log(result);
        let topics: ReferenceDataEntity[] = [];
        if (result && result.length >= 1) {
            result.forEach((topic: any) => topics.push({ code: topic.id, description: topic.topic }));
        }
        return topics;
    }

    save(event: ReferenceDataModel): void {
        
    }

    delete(code: number | string): void {

    }
}