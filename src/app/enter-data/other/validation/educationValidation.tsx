import { EducationEventModel, ErrorModel, GroupModel, ReferenceDataModel } from '../../../models';
import { EducationRecipientGroupDAO } from '../../../dao/group';
import { EducationTopicReferenceDataDAO } from '../../../dao/referenceData';
import { validateComboBox, validateCount, validateDate } from '../../../utils/commonFormValidation';
import { EDUCATION_FORM_DATA_IDS } from '../otherJson';
import { DECIMAL_2_DOT_2_MAX, DECIMAL_3_DOT_2_MAX, UNSIGNED_SMALL_INT_MAX } from '../../../constValues';

export async function validateEducationData(formData: FormData, recipientId: string, topicId: string) {
    let errors: Map<string, ErrorModel> = new Map<string, ErrorModel>();

    const dateValidation = validateDate(errors, formData.get(EDUCATION_FORM_DATA_IDS.date), EDUCATION_FORM_DATA_IDS.date);
    errors = dateValidation.errors;

    const recipientValidation = await validateComboBox(
        errors,
        recipientId,
        `${EDUCATION_FORM_DATA_IDS.recipient}-input`,
        'Recipient',
        'recipient',
        new EducationRecipientGroupDAO()
    );
    if (recipientValidation.selection) {
        const recipient: GroupModel = { id: recipientValidation.selection.id, name: recipientValidation.selection.name };
        recipientValidation.selection = recipient;
    }
    errors = recipientValidation.errors;

    const topicValidation = await validateComboBox(
        errors,
        topicId,
        `${EDUCATION_FORM_DATA_IDS.topic}-input`,
        'Educational Topic',
        'topic',
        new EducationTopicReferenceDataDAO()
    );
    if (topicValidation.selection) {
        const topic: ReferenceDataModel = { code: topicValidation.selection.code, description: topicValidation.selection.description };
        topicValidation.selection = topic;
    }
    errors = topicValidation.errors;

    const durationValidation = validateCount(
        errors,
        formData.get(EDUCATION_FORM_DATA_IDS.duration),
        EDUCATION_FORM_DATA_IDS.duration,
        'Event Duration',
        DECIMAL_2_DOT_2_MAX,
        'hours',
        false,
        2
    );
    errors = durationValidation.errors;

    const studentCountValidation = validateCount(
        errors,
        formData.get(EDUCATION_FORM_DATA_IDS.studentCount),
        EDUCATION_FORM_DATA_IDS.studentCount,
        'Number of Students',
        UNSIGNED_SMALL_INT_MAX,
        'count',
        false
    );
    errors = studentCountValidation.errors;

    const volunteerCountValidation = validateCount(
        errors,
        formData.get(EDUCATION_FORM_DATA_IDS.volunteerCount),
        EDUCATION_FORM_DATA_IDS.volunteerCount,
        'Number of Volunteers',
        UNSIGNED_SMALL_INT_MAX,
        'count',
        true
    );
    errors = volunteerCountValidation.errors;

    const volunteerHoursValidation = validateCount(
        errors,
        formData.get(EDUCATION_FORM_DATA_IDS.volunteerHours),
        EDUCATION_FORM_DATA_IDS.volunteerHours,
        'Volunteer Hours',
        DECIMAL_3_DOT_2_MAX,
        'hours',
        true,
        2
    );
    errors = volunteerHoursValidation.errors;

    console.log(recipientValidation);
    console.log(topicValidation);

    let data: EducationEventModel | null = null;
    if (errors.size === 0 && dateValidation.date &&
        recipientValidation.selection &&
        topicValidation.selection &&
        durationValidation.count &&
        studentCountValidation.count &&
        (volunteerCountValidation.count || volunteerCountValidation.count === 0) &&
        (volunteerHoursValidation.count || volunteerHoursValidation.count === 0)
    ) {
        data = {
            date: dateValidation.date,
            recipient: recipientValidation.selection,
            topic: topicValidation.selection,
            duration: durationValidation.count,
            studentCount: studentCountValidation.count,
            volunteerCount: volunteerCountValidation.count,
            volunteerHours: volunteerHoursValidation.count
        };
    }
    return { data: data, errors: errors };
}