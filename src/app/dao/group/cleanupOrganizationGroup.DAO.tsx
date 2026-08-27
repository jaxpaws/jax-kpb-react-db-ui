import { GroupEntity } from '../../entities/group/group.entity';
import { GroupModel } from '../../models/group';
import { GroupDAO } from './group.DAO';
import { getCleanupOrganizationById, getCleanupOrganizations } from '../../lib/group.sql';

export class CleanupOrganizationGroupDAO implements GroupDAO {
    async getById(id: number): Promise<GroupEntity | null> {
        const result: any = await getCleanupOrganizationById(id);
        if (result && result.length >= 1) {
            return { id: result[0].id, name: result[0].name };
        }
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