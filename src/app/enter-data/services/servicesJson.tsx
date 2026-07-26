export const ROADSIDE_LITTER_FORM_DATA_IDS = {
    date: 'roadside-litter-date',
    litterPounds: 'roadside-litter-pounds',
    recyclingPounds: 'roadside-litter-recycling',
    districts: 'roadside-litter-districts',
    locations: 'roadside-litter-locations',
    hasBulkyItems: 'roadside-litter-has-bulky-items',
    bulkyItems: 'roadside-litter-bulky-items'
}

export const REPORTING_DATA_TYPE_LIST_NAME = 'reporting-data-types';

export const REPORTING_DATA_TYPE_OPTIONS = [
    {key:`${REPORTING_DATA_TYPE_LIST_NAME}-option1`,label:'Roadside Litter',inputId:'roadside',value:'roadside'},
    {key:`${REPORTING_DATA_TYPE_LIST_NAME}-option2`,label:'Clean Team Event',inputId:'clean-team',value:'clean-team'},
    {key:`${REPORTING_DATA_TYPE_LIST_NAME}-option3`,label:'Trash Routes',inputId:'routes',value:'routes'},
    {key:`${REPORTING_DATA_TYPE_LIST_NAME}-option4`,label:'County Neighborhood Cleanups',inputId:'county-cleanup',value:'county-cleanup'}
];

export const DISTRICT_OPTIONS = [
    {key:`${ROADSIDE_LITTER_FORM_DATA_IDS.districts}-option1`,label:'District 1',inputId:'district1',value:'1'},
    {key:`${ROADSIDE_LITTER_FORM_DATA_IDS.districts}-option2`,label:'District 2',inputId:'district2',value:'2'},
    {key:`${ROADSIDE_LITTER_FORM_DATA_IDS.districts}-option3`,label:'District 3',inputId:'district3',value:'3'},
    {key:`${ROADSIDE_LITTER_FORM_DATA_IDS.districts}-option4`,label:'District 4',inputId:'district4',value:'4'},
    {key:`${ROADSIDE_LITTER_FORM_DATA_IDS.districts}-option5`,label:'District 5',inputId:'district5',value:'5'},
    {key:`${ROADSIDE_LITTER_FORM_DATA_IDS.districts}-option6`,label:'District 6',inputId:'district6',value:'6'},
    {key:`${ROADSIDE_LITTER_FORM_DATA_IDS.districts}-option7`,label:'District 7',inputId:'district7',value:'7'}
];

export const HAS_BULKY_ITEMS_OPTIONS = [
    {key:`${ROADSIDE_LITTER_FORM_DATA_IDS.hasBulkyItems}-option1`,label:'No',inputId:'bulky-items-no',value:'no'},
    {key:`${ROADSIDE_LITTER_FORM_DATA_IDS.hasBulkyItems}-option2`,label:'Yes',inputId:'bulky-items-yes',value:'yes'}
];

export const BULKY_ITEM_OPTIONS_EXPECTED = [
    'Bed Footboard',
    'Bed Headboard',
    'Cabinet',
    'Chair',
    'Couch/Sofa',
    'Dresser',
    'Loveseat',
    'Pile of Wood/Lumber',
    'Pile of Fence Wood',
    'Recliner',
    'Table'
];

export const BULKY_ITEM_OPTIONS = [
    {key:`${ROADSIDE_LITTER_FORM_DATA_IDS.bulkyItems}-Bed-Footboard`,label:'Bed Footboard',inputId:'bulky-item-Bed-Footboard',value:'Bed Footboard'},
    {key:`${ROADSIDE_LITTER_FORM_DATA_IDS.bulkyItems}-option2`,label:'Bed Headboard',inputId:'bulky-item-Bed-Headboard',value:'Bed Headboard'},
    {key:`${ROADSIDE_LITTER_FORM_DATA_IDS.bulkyItems}-option3`,label:'Cabinet',inputId:'bulky-item-3',value:'Cabinet'},
    {key:`${ROADSIDE_LITTER_FORM_DATA_IDS.bulkyItems}-option4`,label:'Chair',inputId:'bulky-item-4',value:'Chair'},
    {key:`${ROADSIDE_LITTER_FORM_DATA_IDS.bulkyItems}-option5`,label:'Couch/Sofa',inputId:'bulky-item-5',value:'Couch/Sofa'},
    {key:`${ROADSIDE_LITTER_FORM_DATA_IDS.bulkyItems}-option6`,label:'Dresser',inputId:'bulky-item-6',value:'Dresser'},
    {key:`${ROADSIDE_LITTER_FORM_DATA_IDS.bulkyItems}-option7`,label:'Loveseat',inputId:'bulky-item-7',value:'Loveseat'},
    {key:`${ROADSIDE_LITTER_FORM_DATA_IDS.bulkyItems}-option8`,label:'Pile of Wood/Lumber',inputId:'bulky-item-8',value:'Pile of Wood/Lumber'},
    {key:`${ROADSIDE_LITTER_FORM_DATA_IDS.bulkyItems}-option9`,label:'Pile of Fence Wood',inputId:'bulky-item-9',value:'Pile of Fence Wood'},
    {key:`${ROADSIDE_LITTER_FORM_DATA_IDS.bulkyItems}-option10`,label:'Recliner',inputId:'bulky-item-10',value:'Recliner'},
    {key:`${ROADSIDE_LITTER_FORM_DATA_IDS.bulkyItems}-option11`,label:'Table',inputId:'bulky-item-11',value:'Table'}
];

export const ORGANIZATION_OPTIONS = [
    {key:`org-Cox-key`,listItemId:'org-Cox',label:'Cox',isSelected:false},
    {key:`org-FromTheGroundUpGarden-key`,listItemId:'org-FromTheGroundUpGarden',label:'From The Ground Up Garden',isSelected:false},
    {key:`org-NavyFederal-key`,listItemId:'org-NavyFederal',label:'Navy Federal',isSelected:false},
    {key:`org-PensacolaYoungProfessionals-key`,listItemId:'org-PensacolaYoungProfessionals',label:'Pensacola Young Professionals',isSelected:false},
    {key:`org-UWFSEAS-key`,listItemId:'org-UWFSEAS',label:'UWF SEAS',isSelected:false}
];