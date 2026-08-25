import { AdoptASpotGroupEntity } from '../../entities/adoptASpotGroup.entity';
import { GroupModel } from '../../models';
import { GroupDAO } from './group.DAO';
import { getAdoptASpotAssignmentById, getAdoptASpotAssignments } from '../../lib/group.sql';

export class AdoptASpotGroupDAO implements GroupDAO {
    async getById(id: number): Promise<AdoptASpotGroupEntity | null> {
        const result: any = await getAdoptASpotAssignmentById(id);
        if (result && result.length >= 1) {
            return { id: result[0].id, name: result[0].group_name, location: result[0].location };
        }
        return null;
    }

    async getAll(): Promise<AdoptASpotGroupEntity[]> {
        const result: any = await getAdoptASpotAssignments();
        let assignments: AdoptASpotGroupEntity[] = [];
        if (result && result.length >= 1) {
            result.forEach((assignment: any) => assignments.push({ id: assignment.id, name: assignment.group_name, location: assignment.location }));
        }
        return assignments;
    }

    async save(group: GroupModel): Promise<void> {}

    delete(id: number): void {}
}