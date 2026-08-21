export const REPORTING_DATA_VALUES = {
    adoptASpot: 'adopt-a-spot',
    groupCleanup: 'group-cleanup'
};

const ADOPT_A_SPOT_CODE: string = 'adpt-spt';
export const ADOPT_A_SPOT_FORM_DATA_IDS = {
    date: `${ADOPT_A_SPOT_CODE}-date`,
    spot: `${ADOPT_A_SPOT_CODE}-spot`,
    volunteerCount: `${ADOPT_A_SPOT_CODE}-vol-count`,
    volunteerHours: `${ADOPT_A_SPOT_CODE}-vol-hours`,
    litterCollected: `${ADOPT_A_SPOT_CODE}-litter`,
    recyclingCollected: `${ADOPT_A_SPOT_CODE}-recycling`
};

const GROUP_CLEANUP_CODE: string = 'grp-cln';
export const GROUP_CLEANUP_FORM_DATA_IDS = {
    date: `${GROUP_CLEANUP_CODE}-date`,
    organization: `${GROUP_CLEANUP_CODE}-organization`,
    location: `${GROUP_CLEANUP_CODE}-location`,
    volunteerCount: `${GROUP_CLEANUP_CODE}-vol-count`,
    volunteerHours: `${GROUP_CLEANUP_CODE}-vol-hours`,
    litterCollected: `${GROUP_CLEANUP_CODE}-litter`,
    recyclingCollected: `${GROUP_CLEANUP_CODE}-recycling`
};

export const REPORTING_DATA_TYPE_LIST_NAME = 'reporting-data-types';

export const REPORTING_DATA_TYPE_OPTIONS = [
    {key:`${REPORTING_DATA_TYPE_LIST_NAME}-option1`,label:'Adopt-a-Spot Cleanup',inputId:REPORTING_DATA_VALUES.adoptASpot,value:REPORTING_DATA_VALUES.adoptASpot},
    {key:`${REPORTING_DATA_TYPE_LIST_NAME}-option2`,label:'Group Cleanup',inputId:REPORTING_DATA_VALUES.groupCleanup,value:REPORTING_DATA_VALUES.groupCleanup},
];

export const ORGANIZATION_OPTIONS = [
    {key:`org-Cox-key`,listItemId:'org-Cox',label:'Cox',isSelected:false},
    {key:`org-FromTheGroundUpGarden-key`,listItemId:'org-FromTheGroundUpGarden',label:'From The Ground Up Garden',isSelected:false},
    {key:`org-NavyFederal-key`,listItemId:'org-NavyFederal',label:'Navy Federal',isSelected:false},
    {key:`org-PensacolaYoungProfessionals-key`,listItemId:'org-PensacolaYoungProfessionals',label:'Pensacola Young Professionals',isSelected:false},
    {key:`org-UWFSEAS-key`,listItemId:'org-UWFSEAS',label:'UWF SEAS',isSelected:false}
];