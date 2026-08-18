'use client'

import { useState } from 'react';
import volunteerCleanupFieldsJson from './volunteerCleanupFields.json';
import cleanupContactFieldsJson from './cleanupContactFields.json';
import { saveVolunteerCleanupToDb } from './actions';

const TAN_YELLOW_HEX = '#F4E2A3';
const GOLD_HEX = '#E4BA24';
const ROADSIDE = 'ROADSIDE';
const VOLUNTEER = 'VOLUNTEER';

// function VolunteerDataEntryFields() {
//     let fieldList = volunteerCleanupFieldsJson.map(field =>
//         <Textbox
//             key={field.key}
//             id={field.id}
//             inputType={field.inputType}
//             inputName={field.inputName}
//             labelTxt={field.labelTxt}
//             maxlength={field.maxlength}
//         />
//     );
//     return (
//         <div className="flex flex-col gap-2">
//             {fieldList}
//         </div>
//     );
// }

// function CleanupContactDataEntryFields() {
//     let fieldList = cleanupContactFieldsJson.map(field =>
//         <Textbox
//             key={field.key}
//             id={field.id}
//             inputType={field.inputType}
//             inputName={field.inputName}
//             labelTxt={field.labelTxt}
//             maxlength={field.maxlength}
//         />
//     );
//     return (
//         <div>
//             <strong>Cleanup Contact</strong>
//             <div className="flex flex-row gap-2">
//                 {fieldList}
//             </div>
//         </div>
//     );
    
// }

function ToggleButton({btnType, label, selectedType, onClickFunction}:
    { btnType: string, label: string, selectedType: string, onClickFunction: Function })
{
    return (
        <button
            className="p-2 border-2 rounded-sm"
            style={{backgroundColor: `${selectedType === btnType ? GOLD_HEX : TAN_YELLOW_HEX}`}}
            onClick={() => {
                onClickFunction(btnType);
            }}
            >{label}
        </button>
    )
}

function VolunteerDataEntryForm() {
    return (
        <form action={saveVolunteerCleanupToDb}>
            <button className="mt-4">Submit</button>
        </form>
    )
}

export default function Page() {
    const [entryType, setEntryType] = useState('');

    return (
        <div className="px-8">
            <h1 className="text-3xl">Data Entry</h1>
            <div className="flex flex-row gap-2 mt-3">
                <ToggleButton btnType={ROADSIDE} label="Roadside Litter" selectedType={entryType} onClickFunction={setEntryType} />
                <ToggleButton btnType={VOLUNTEER} label="Volunteer Cleanup" selectedType={entryType} onClickFunction={setEntryType} />
            </div>
            <div className="mt-3">
                { entryType === VOLUNTEER && <VolunteerDataEntryForm /> }
            </div>
        </div>
    );
}