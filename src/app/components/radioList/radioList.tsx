'use client'

import { RadioButton } from './radioButton';
import { RadioListModel } from './radioList.model';
import { isBlank } from '../../utils/isBlank';
import { parseJsonStringOptions} from '../../utils/parseJsonStringOptions';

export function RadioList({ label, listName, options, descriptionText, isRequired, selectedValue, handleChange }: RadioListModel) {
    return (
        <div>
            <fieldset>
                <legend><p className="text-[1.06rem] font-semibold">{`${label}${isRequired ? ' (required)' : ''}`}</p></legend>
                <span className="flex flex-col gap-1 mt-2">
                    { !isBlank(descriptionText) && <div id={`${listName}-description`}>{ descriptionText }</div>}
                    { parseJsonStringOptions(options).map((option: { key: string, label: string, inputId: string, value: string }) => (
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
                        </span>
                    ))}
                </span>
            </fieldset>
        </div>
    );
}