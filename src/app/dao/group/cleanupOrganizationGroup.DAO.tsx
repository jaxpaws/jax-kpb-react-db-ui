import { GroupEntity } from '../../entities/group.entity';
import { ReferenceDataEntity } from '../../entities/referenceData.entity';
import { GroupModel } from '../../models';
import { GroupDAO } from './group.DAO';
import { getCleanupOrganizations } from '../../lib/group.sql';

export class CleanupOrganizationGroupDAO implements GroupDAO {
    async getById(id: number): Promise<GroupEntity | null> {
        return null;
    }

    async getAll(): Promise<GroupEntity[]> {
        const result: any = await getCleanupOrganizations();
        let organizations: GroupEntity[] = [];
        if (result && result.length >= 1) {
            result.forEach((organization: any) => organizations.push({ id: organization.id, name: organization.name }));
        }
        return organizations;
    }

    async save(group: GroupModel): Promise<void> {}

    delete(id: number): void {}
}