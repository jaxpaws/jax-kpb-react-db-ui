import { EventModel } from './event.model';
import { GroupModel } from './group.model';
import { ReferenceDataModel } from './referenceData.model';

export interface GroupCleanupEventModel extends EventModel {
    organization: GroupModel;
    location: ReferenceDataModel;
    volunteerCount: number;
    volunteerHours: number;
    litterCollected: number;
    recyclingCollected: number;
}