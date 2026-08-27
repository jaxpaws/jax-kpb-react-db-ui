import { EventModel } from './event.model';
import { GroupModel } from './group.model';
import { ReferenceDataModel } from './referenceData.model';

export interface EducationEventModel extends EventModel {
    recipient: GroupModel;
    topic: ReferenceDataModel;
    duration: number;
    studentCount: number;
    volunteerCount: number;
    volunteerHours: number;
}