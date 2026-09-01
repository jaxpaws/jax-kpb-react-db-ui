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

    async save(event: EventModel, isUpdate: boolean): Promise<void> {
        if (isEducationEvent(event)) {
            const recipientId: number = Number.isNaN(Number(event.topic.code)) ? -1 : Number(event.topic.code);
            const eventEntity: EducationEventEntity = {
                id: event.id ? event.id : -1,
                date: event.date,
                topicId: event.recipient.id ? event.recipient.id : -1,
                recipientId: recipientId,
                eventLength: event.duration,
                studentCount: event.studentCount,
                volunteerCount: event.volunteerCount,
                volunteerHours: event.volunteerHours
            };

            if (isUpdate) {
                await updateEducationEvent(eventEntity);
            } else {
                await insertEducationEvent(eventEntity);
            }
        } else {
            console.error(`Error in save(): invalid data did not adhere to EducationEventModel.`);
        }
    }

    delete(id: number): void {
        console.log('Deleting');
    }
}