'use client'

import { useState } from 'react';
import RadioButton from './radioButton';
import RadioListModel from '../models/radioList.model';
import parseJsonStringOptions from '../utils/parseJsonStringOptions';
import isBlank from '../utils/isBlank';

export default function RadioList({ label, listName, options, descriptionText, isRequired, selectedValue, handleChange }: RadioListModel) {
    function RadioButtons({listName, optionsString, handleChange}: {listName: string, optionsString: string, handleChange?: (event: any) => void}) {
        let options: React.JSX.Element[] = [];
        parseJsonStringOptions(optionsString).map((option: { key: string, label: string, inputId: string, value: string }) => options.push(
            <span key={option.key}>
                <RadioButton
                    label={option.label}
                    inputId={option.inputId}
                    value={option.value}
                    listName={listName}
                    selectedValue={selectedValue}
                    handleChange={handleChange}
                >
                </RadioButton>
                {/* <input
                    type="radio"
                    id={option.inputId}
                    name={listName}
                    value={option.value}
                    checked={selectedValue === option.value}
                    onChange={handleChange}>
                </input>
                <label htmlFor={option.inputId} className="ml-1">{option.label}</label> */}
            </span>
        ));
        return options;
    }

    function Description({ descriptionText, listName }: { descriptionText: string | undefined, listName: string }) {
        return (isBlank(descriptionText)) ? '' : <span id={`${listName}-description`}></span>
    }
    
    return (
        <div>
            <fieldset>
                <legend><p className="text-[1.06rem] font-semibold">{`${label}${isRequired ? ' (required)' : ''}`}</p></legend>
                <span className="flex flex-col gap-1 mt-2">
                    <Description descriptionText={descriptionText} listName={listName}></Description>
                    <RadioButtons listName={listName} optionsString={options} handleChange={handleChange}></RadioButtons>
                </span>
            </fieldset>
        </div>
    );
}