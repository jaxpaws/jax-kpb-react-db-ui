'use client'

import RadioButtons from './radioButtons';
import RadioListModel from '../models/radioList.model';
import isBlank from '../utils/isBlank';

export default function RadioList({ label, listName, options, descriptionText, isRequired, selectedValue, handleChange }: RadioListModel) {
    function getDescription(descriptionText: string | undefined, listName: string) {
        return (isBlank(descriptionText)) ? '' : <span id={`${listName}-description`}></span>
    }
    
    return (
        <div>
            <fieldset>
                <legend><p className="text-[1.06rem] font-semibold">{`${label}${isRequired ? ' (required)' : ''}`}</p></legend>
                <span className="flex flex-col gap-1 mt-2">
                    { getDescription(descriptionText, listName) }
                    <RadioButtons listName={listName} selectedValue={selectedValue} optionsString={options} handleChange={handleChange}></RadioButtons>
                </span>
            </fieldset>
        </div>
    );
}