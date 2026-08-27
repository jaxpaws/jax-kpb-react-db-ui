import { EventDAO } from './';
import { BulkyItemEntity } from '../../entities/bulkyItem.entity';
import { DistrictEntity } from '../../entities/district.entity';
import { EventEntity } from '../../entities/event.entity';
import { RoadsideLitterEventEntity } from '../../entities/roadsideLitterEvent.entity';
import { BulkyItemModel, DistrictModel, EventModel } from '../../models';
import { isRoadsideLitterEvent } from '../../utils/eventTypeGuards';
import { insertRoadsideLitterEvent, updateRoadsideLitterEvent } from '../../lib/event.sql';

export class RoadsideLitterEventDAO implements EventDAO {
    async getById(id: number): Promise<EventEntity | null> {
        return null;
    }

    async save(event: EventModel, isUpdate: boolean): Promise<void> {
        if (isRoadsideLitterEvent(event)) {
            const eventEntity: RoadsideLitterEventEntity = {
                id: event.id ? event.id : -1,
                date: event.date,
                litterLbs: event.litterPounds,
                recyclingLbs: event.recyclingPounds,
                locations: event.locations
            };

            let districtEntities: DistrictEntity[] = [];
            event.districts.map((district: DistrictModel) => {
                districtEntities.push({
                    id: district.id ? district.id : -1,
                    eventId: event.id ? event.id : -1,
                    districtCode: `${district.districtRef.code}`
                });
            });

            let bulkyItemEntities: BulkyItemEntity[] = [];
            event.bulkyItems.map((item: BulkyItemModel) => {
                bulkyItemEntities.push({
                    id: item.id ? item.id : -1,
                    bulkyItemRefId: Number(item.bulkyItemRef.code),
                    eventId: event.id ? event.id : -1,
                    quantity: item.quantity
                });
            });

            if (isUpdate) {
                // TODO: Implement UPDATE method
                await updateRoadsideLitterEvent(eventEntity, districtEntities, bulkyItemEntities);
            } else {
                await insertRoadsideLitterEvent(eventEntity, districtEntities, bulkyItemEntities);
            }
        } else {
            console.error(`Error in save(): invalid data did not adhere to RoadsideLitterModel.`);
        }
    }

    delete(id: number): void {

    }
}