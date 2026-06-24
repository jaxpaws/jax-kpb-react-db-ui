'use server'

import Cleanup from '@/src/models/cleanup';
import Contact from '@/src/models/contact';
import { testConnection, insertCleanupWithContact } from '@/src/lib/sql';

function validateCleanupsTableData(data: Cleanup): string[] {
    let errors: string[] = [];
    if (data.date.length > 10) {
        // Implement error handling
    }
    if (data.organization.length > 50) {
        // Implement error handling
    }
    return errors;
}

function validateContactsTableData(contact: Contact): string[] {
    let errors: string[] = [];
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(contact.email)) {
        // Implement error handling
    }
    if (contact.fName.length > 25) {
        // Implement error handling
    }
    return errors;
}

export const saveVolunteerCleanupToDb = async (formData: FormData) => {
    await testConnection();
    let cid: string = '';
    let rawContactData = {
        contactFName: formData.get('contactFName'),
        contactLName: formData.get('contactLName'),
        contactEmail: formData.get('contactEmail'),
        contactPhoneNum: formData.get('contactPhoneNum')
    };
    if (
        !rawContactData.contactFName || rawContactData.contactFName === '' ||
        !rawContactData.contactLName || rawContactData.contactLName === '' ||
        !rawContactData.contactEmail || rawContactData.contactEmail === '' ||
        !rawContactData.contactPhoneNum || rawContactData.contactPhoneNum === ''
    ) {
        // Implement error handling here
        return;
    }
    
    const contactData: Contact = {
        fName: rawContactData.contactFName.toString(),
        lName: rawContactData.contactLName.toString(),
        email: rawContactData.contactEmail.toString(),
        phoneNum: rawContactData.contactPhoneNum.toString(),
    };
    if (validateContactsTableData(contactData).length > 0) {
        // Implement error handling here
        return;
    }
    
    let rawCleanupData = {
        date: formData.get('date'),
        organization: formData.get('organization'),
        litter: formData.get('litter'),
        volunteerCount: formData.get('volunteerCount'),
        hours: formData.get('hours')
    };
    if (
        !rawCleanupData.date || rawCleanupData.date === '' ||
        !rawCleanupData.organization || rawCleanupData.organization === '' ||
        !rawCleanupData.litter || rawCleanupData.litter === '' ||
        !rawCleanupData.volunteerCount || rawCleanupData.volunteerCount === '' ||
        !rawCleanupData.hours || rawCleanupData.hours === ''
    ) {
        // Implement error handling here
        return;
    }

    const cleanupData: Cleanup = {
        date: rawCleanupData.date.toString(),
        organization: rawCleanupData.organization.toString(),
        litter: Number(rawCleanupData.litter.toString()),
        volunteerCount: Number(rawCleanupData.volunteerCount.toString()),
        hours: Number(rawCleanupData.hours.toString()),
        cid: cid
    };
    if (validateCleanupsTableData(cleanupData).length > 0) {
        // Implement error handling here
        return;
    }
    insertCleanupWithContact(cleanupData, contactData);
};