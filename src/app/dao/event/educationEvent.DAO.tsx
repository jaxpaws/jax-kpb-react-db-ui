import { EventDAO } from './';
import { EventEntity } from '../../entities/event/event.entity';
import { EducationEventEntity } from '../../entities/event/educationEvent.entity';
import { EventModel } from '../../models';
import { isEducationEvent } from '../../utils/eventTypeGuards';
import { insertEducationEvent, updateEducationEvent } from '../../lib/event.sql';

export class EducationEventDAO implements EventDAO {
    async getById(id: number): Promise<EventEntity | null> {
        return null;
    }

    async save(event: EventModel, isUpdate: boolean): Promise<number> {
        if (isEducationEvent(event)) {
            const topicId: number = Number.isNaN(Number(event.topic.code)) ? -1 : Number(event.topic.code);
            const recipientId: number = event.recipient.id ? event.recipient.id : -1;
            if (topicId === -1 || recipientId === -1) {
                console.error(`Error in save(): no valid topic or recipient in Education Event.`);
                return -1;
            }
            const eventEntity: EducationEventEntity = {
                id: event.id ? event.id : -1,
                date: event.date,
                topicId: topicId,
                recipientId: recipientId,
                eventLength: event.duration,
                studentCount: event.studentCount,
                volunteerCount: event.volunteerCount,
                volunteerHours: event.volunteerHours
            };

            if (isUpdate) {
                return await updateEducationEvent(eventEntity);
            } else {
                return await insertEducationEvent(eventEntity);
            }
        } else {
            console.error(`Error in save(): invalid data did not adhere to EducationEventModel.`);
        }
        return -1;
    }

    delete(id: number): void {
        console.log('Deleting');
    }
}