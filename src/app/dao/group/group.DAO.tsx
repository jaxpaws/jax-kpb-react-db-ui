import { GroupEntity } from '../../entities/group.entity';
import { GroupModel } from '../../models';

export interface GroupDAO {
    getById(id: number): GroupEntity | null;
    save(group: GroupModel): void;
    delete(id: number): void;
}