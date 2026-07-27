import parseJsonStringOptions from '../utils/parseJsonStringOptions';
import MultiSelectOption from '../models/multiSelectOption.model';
import Checkbox from './checkbox';

export default function Checkboxes({ multiSelectName, optionsString, filter, selectedValuesMap, handleChange }:
    { multiSelectName: string, optionsString: string, filter: string, selectedValuesMap?: Map<string, any>, handleChange?: (event: any) => void }
) {
    let options: React.JSX.Element[] = [];
    parseJsonStringOptions(optionsString).map((option: MultiSelectOption) => {
        if ((!filter || filter === '') || (option.label.toLowerCase().indexOf(filter.toLowerCase()) === 0)) {
            options.push(
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
            );
        }
    });
    return options;
}