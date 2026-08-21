import { GroupEntity } from '../../entities/group.entity';
import { GroupModel } from '../../models';
import { GroupDAO } from './group.DAO';

export class CleanupOrganizationGroupDAO implements GroupDAO {
    getById(id: number): GroupEntity | null {
        return null;
    }

    async save(group: GroupModel): Promise<void> {}

    delete(id: number): void {}
}