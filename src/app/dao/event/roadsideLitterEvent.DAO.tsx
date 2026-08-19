import { EventDAO } from './';
import { BulkyItemEntity } from '../../entities/bulkyItem.entity';
import { DistrictEntity } from '../../entities/district.entity';
import { EventEntity } from '../../entities/event.entity';
import { RoadsideLitterEntity } from '../../entities/roadsideLitterEvent.entity';
import { BulkyItemModel, DistrictModel, EventModel } from '../../models';
import { isRoadsideLitterEvent } from '../../utils/eventTypeGuards';
import { insertRoadsideLitterEvent, updateRoadsideLitterEvent } from '../../lib/sql';

export class RoadsideLitterEventDAO implements EventDAO {
    getById(id: number): EventEntity | null {
        return null;
    }

    async save(event: EventModel, isUpdate: boolean): Promise<void> {
        console.log(isRoadsideLitterEvent(event));
        if (isRoadsideLitterEvent(event)) {
            const eventEntity: RoadsideLitterEntity = {
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
                    districtCode: district.districtRef.code
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
                await updateRoadsideLitterEvent(eventEntity, districtEntities, bulkyItemEntities);
            } else {
                console.log('Calling insert for roadside litter event');
                await insertRoadsideLitterEvent(eventEntity, districtEntities, bulkyItemEntities);
            }
        }
    }

    delete(id: number): void {

    }
}