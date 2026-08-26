import { GroupEntity } from '../../entities/group.entity';
import { GroupModel } from '../../models';
import { GroupDAO } from './group.DAO';
import { getEducationRecipientById, getEducationRecipients } from '../../lib/group.sql';

export class EducationRecipientGroupDAO implements GroupDAO {
    async getById(id: number): Promise<GroupEntity | null> {
        const result: any = await getEducationRecipientById(id);
        if (result && result.length >= 1) {
            return { id: result[0].id, name: result[0].name };
        }
        return null;
    }

    async getAll(): Promise<GroupEntity[]> {
        const result: any = await getEducationRecipients();
        console.log(result);
        let recipients: GroupEntity[] = [];
        if (result && result.length >= 1) {
            result.forEach((recipient: any) => recipients.push({ id: recipient.id, name: recipient.name }));
        }
        return recipients;
    }

    async save(group: GroupModel): Promise<void> {}

    delete(id: number): void {}
}