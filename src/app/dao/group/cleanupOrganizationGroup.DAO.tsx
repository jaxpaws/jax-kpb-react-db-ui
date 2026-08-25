import { GroupEntity } from '../../entities/group.entity';
import { GroupModel } from '../../models';
import { GroupDAO } from './group.DAO';

export class CleanupOrganizationGroupDAO implements GroupDAO {
    async getById(id: number): Promise<GroupEntity | null> {
        return null;
    }

    async getAll(): Promise<GroupEntity[]> {
        return [];
    }

    async save(group: GroupModel): Promise<void> {}

    delete(id: number): void {}
}