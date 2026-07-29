import { useState } from 'react';
import Checkboxes from './checkboxes';
import MultiSelectModel from '../models/multiSelect.model';
import isBlank from '../utils/isBlank';

function SearchBar({ hasSearch, multiSelectName, currValue, handleChange }:
    { hasSearch: boolean, multiSelectName: string, currValue: string, handleChange: (event: any) => void }
) {
    if (!hasSearch) {
        return '';
    }
    return (
        <span>
            <label htmlFor={`${multiSelectName}-search`} className="sr-only">Type to Filter Options</label>
            <input
                id={`${multiSelectName}-search`}
                type="text"
                name={`${multiSelectName}-search`}
                value={currValue}
                className={`block p-1 border rounded-sm bg-white p-1 w-full sm:w-64`}
                aria-required="false"
                onChange={handleChange}>
            </input>
        </span>
    );
}

export default function MultiSelect({ label, multiSelectName, options, descriptionText, isRequired, hasSearch, orientation, selectedValuesMap, handleChange }: MultiSelectModel) {
    const [filter, setFilter] = useState<string>('');

    function orient(orient: string | undefined): string {
        return (orient === 'grid') ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4' : 'flex flex-col w-100 gap-2'
    }

    function getDescription(descriptionText: string | undefined, multiSelectName: string) {
        return ((isBlank(descriptionText)) ? '' : <span id={`${multiSelectName}-description`}>{ descriptionText }</span>);
    }

    return (
        <fieldset>
            <legend><p className="text-[1.06rem] font-semibold">{`${label}${isRequired ? ' (required)' : ''}`}</p></legend>

            { getDescription(descriptionText, multiSelectName) }
            <SearchBar
                hasSearch={hasSearch === true}
                multiSelectName={multiSelectName}
                currValue={filter}
                handleChange={(event) => { event.preventDefault(); setFilter(event?.target?.value); }}>
            </SearchBar>
            <span className={`${orient(orientation)} mt-1`}>
                <Checkboxes
                    multiSelectName={multiSelectName}
                    optionsString={options}
                    filter={filter}
                    selectedValuesMap={selectedValuesMap}
                    handleChange={handleChange}>
                </Checkboxes>
            </span>
        </fieldset>
    );
}