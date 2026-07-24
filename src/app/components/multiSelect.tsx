import Checkbox from './checkbox';
import parseJsonStringOptions from '../utils/parseJsonStringOptions';
import MultiSelectModel from '../models/multiSelect.model';
import isBlank from '../utils/isBlank';

export default function MultiSelect({ label, multiSelectName, options, descriptionText, isRequired, orientation, selectedValuesMap, handleChange }: MultiSelectModel) {
    function Checkboxes({ multiSelectName, optionsString, handleChange }: { multiSelectName: string, optionsString: string, handleChange?: (event: any) => void }) {
        let options: React.JSX.Element[] = [];
        // if (orientation === 'grid') {
            parseJsonStringOptions(optionsString).map((option: { key: string, label: string, inputId: string, value: string }) => options.push(
                <span key={option.key}>
                    <Checkbox
                        inputId={option.inputId}
                        inputName={multiSelectName}
                        label={option.label}
                        value={option.value}
                        isChecked={selectedValuesMap?.has(option.inputId)}
                        handleChange={handleChange}>
                    </Checkbox>
                </span>
            ));
        // } else {
        //     parseJsonStringOptions(optionsString).map((option: { key: string, label: string, inputId: string, value: string }) => options.push(
        //         <span key={option.key} className="">
        //             <Checkbox
        //                 inputId={option.inputId}
        //                 inputName={multiSelectName}
        //                 label={option.label}
        //                 value={option.value}
        //                 isChecked={selectedValuesMap?.has(option.inputId)}
        //                 handleChange={handleChange}>
        //             </Checkbox>
        //         </span>
        //     ));
        // }
        return options;
    }

    function Description({ descriptionText, multiSelectName }: { descriptionText: string | undefined, multiSelectName: string }) {
        return (isBlank(descriptionText)) ? '' : <span id={`${multiSelectName}-description`}></span>
    }

    function orient(orient: string | undefined): string {
        return (orient === 'grid') ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4' : 'flex flex-col w-100 gap-2'
    }

    return (
        <fieldset>
            <legend><p className="text-[1.06rem] font-semibold">{`${label}${isRequired ? ' (required)' : ''}`}</p></legend>

            <Description descriptionText={descriptionText} multiSelectName={multiSelectName}></Description> 
            <span className={`${orient(orientation)} mt-1`}>
                <Checkboxes multiSelectName={multiSelectName} optionsString={options} handleChange={handleChange}></Checkboxes>
            </span>
        </fieldset>
    );
}