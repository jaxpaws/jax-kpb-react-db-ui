import { EventEntity } from './event.entity';

export interface EducationEventEntity extends EventEntity {
    topicId: number;
    recipientId: number;
    eventLength: number;
    studentCount: number;
    volunteerCount: number;
    volunteerHours: number;
}