'use server'

import CleanupsTable from '@/src/models/cleanupsTable';
import ContactsTable from '@/src/models/contactsTable';
import { insertIntoContactsTable, insertIntoCleanupsTable } from '@/src/lib/data';

function validateCleanupsTableData(data: CleanupsTable) {
    if (data.date.length > 10) {
        // Implement error handling
    }
    if (data.organization.length > 50) {
        // Implement error handling
    }
}

function validateContactsTableData(data: ContactsTable) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.contactEmail)) {
        // Implement error handling
    }
    if (data.contactFName.length > 25) {
        // Implement error handling
    }
}

export const saveVolunteerCleanupToDb = async (formData: FormData) => {
    let cid: string = '';
    let rawContactsData = {
        contactFName: formData.get('contactFName'),
        contactLName: formData.get('contactLName'),
        contactEmail: formData.get('contactEmail'),
        contactPhoneNum: formData.get('contactPhoneNum')
    };
    if (
        !rawContactsData.contactFName || rawContactsData.contactFName === '' ||
        !rawContactsData.contactLName || rawContactsData.contactLName === '' ||
        !rawContactsData.contactEmail || rawContactsData.contactEmail === '' ||
        !rawContactsData.contactPhoneNum || rawContactsData.contactPhoneNum === ''
    ) {
        // Implement error handling here
        return;
    } else {
        let contactsData: ContactsTable = {
            contactFName: rawContactsData.contactFName.toString(),
            contactLName: rawContactsData.contactLName.toString(),
            contactEmail: rawContactsData.contactEmail.toString(),
            contactPhoneNum: rawContactsData.contactPhoneNum.toString(),
        };
        validateContactsTableData(contactsData);
        cid = await insertIntoContactsTable(contactsData);
    }
    
    let rawCleanupsData = {
        date: formData.get('date'),
        organization: formData.get('organization'),
        litter: formData.get('litter'),
        volunteerCount: formData.get('volunteerCount'),
        hours: formData.get('hours')
    };
    if (
        !rawCleanupsData.date || rawCleanupsData.date === '' ||
        !rawCleanupsData.organization || rawCleanupsData.organization === '' ||
        !rawCleanupsData.litter || rawCleanupsData.litter === '' ||
        !rawCleanupsData.volunteerCount || rawCleanupsData.volunteerCount === '' ||
        !rawCleanupsData.hours || rawCleanupsData.hours === ''
    ) {
        // Implement error handling here
        return;
    } else {
        let cleanupsData: CleanupsTable = {
            date: rawCleanupsData.date.toString(),
            organization: rawCleanupsData.organization.toString(),
            litter: Number(rawCleanupsData.litter.toString()),
            volunteerCount: Number(rawCleanupsData.volunteerCount.toString()),
            hours: Number(rawCleanupsData.hours.toString()),
            cid: cid
        };
        validateCleanupsTableData(cleanupsData);
        insertIntoCleanupsTable(cleanupsData);
    }
};