import TextboxModel from '../models/textbox.model';
import isBlank from '../utils/isBlank';

function Error({ errorText, inputId }: { errorText: string | undefined, inputId: string }) {
    return (isBlank(errorText)) ? '' : <span id={`${inputId}-error`} role="alert">{errorText}</span>
}

function Description({ descriptionText, inputId }: { descriptionText: string | undefined, inputId: string }) {
    return (isBlank(descriptionText)) ? '' : <span id={`${inputId}-description`}></span>
}

/**
 * 
 * @param inputId required
 * @param inputType required
 * @param inputName optional
 * @param labelText required
 * @param descriptionText optional
 * @param maxlength optional
 * @param isRequired optional
 * @param errorText optional
 * @returns a <div> with a <label>, a <span> additional description (if provided), an <input>, and a <span> error message (if provided)
 */
export default function Textbox({ inputId, inputType, inputName, labelText, descriptionText, maxlength, width, isRequired, labelFontWeight, errorText }: TextboxModel) {
    const DEFAULT_TEXT_WIDTH: string = 'sm:w-32';
    const DEFAULT_DATE_WIDTH: string = 'sm:w-[138px]';
    
    return (
        <div>
            <label id={`${inputId}-label`} htmlFor={inputName ? inputName : inputId}>
                <p className={`text-[1.06rem] ${labelFontWeight ? labelFontWeight : 'font-semibold'}`}>
                    {`${labelText}${isRequired ? ' (required)' : ''}`}
                </p>
            </label>
            <Description descriptionText={descriptionText} inputId={inputId}></Description>
            <input
                id={inputId}
                type={inputType}
                name={inputName ? inputName : inputId}
                className={`block p-1 border rounded-sm bg-white p-1
                    ${width ? `${width}` : (inputType === 'date' ? DEFAULT_DATE_WIDTH : DEFAULT_TEXT_WIDTH)} w-full`}
                maxLength={maxlength}
                aria-required={isRequired}
                aria-invalid={!isBlank(errorText)}
                aria-describedby={`${`${inputId}-label`} ${descriptionText ? `${inputId}-description` : ''} ${errorText ? `${inputId}-error` : ''}`}>
            </input>
            <Error errorText={errorText} inputId={inputId}></Error>
        </div>
    );
}