import RadioButton from './radioButton';
import parseJsonStringOptions from '../utils/parseJsonStringOptions';

export default function RadioButtons({listName, selectedValue, optionsString, handleChange}:
    {listName: string, selectedValue?: string, optionsString: string, handleChange?: (event: any) => void}
) {
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
        </span>
    ));
    return options;
}