import { EventModel } from './event.model';

export interface EducationEventModel extends EventModel {
    recipient: string;
    topic: string;
    duration: number;
    studentCount: number;
    volunteerCount: number;
    volunteerHours: number;
}