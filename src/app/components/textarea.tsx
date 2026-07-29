import TextareaModel from '../models/textarea.model';
import isBlank from '../utils/isBlank';

/**
 * 
 * @param textareaId required
 * @param textareaName optional
 * @param labelText required
 * @param descriptionText optional
 * @param maxlength optional
 * @param isRequired optional
 * @param errorText optional
 * @returns a <div> with a <label>, a <span> additional description (if provided), a <textarea>, and a <span> error message (if provided)
 */
export default function Textarea({ textareaId, textareaName, labelText, descriptionText, maxlength, rows, cols, isRequired, labelFontWeight, errorText }: TextareaModel) {
    const DEFAULT_ROWS = 3;
    const DEFAULT_COLS = 100;

    function getDescription(descriptionText: string | undefined, textareaId: string) {
        return (isBlank(descriptionText)) ? '' : <span id={`${textareaId}-description`}>{descriptionText}</span>
    }

    function getError(errorText: string | undefined, textareaId: string) {
        return (isBlank(errorText)) ? '' : <span id={`${textareaId}-error`} role="alert">{errorText}</span>
    }
    
    return (
        <div>
            <label id={`${textareaId}-label`} htmlFor={textareaName}>
                <p className={`text-[1.06rem] ${labelFontWeight ? labelFontWeight : 'font-semibold'}`}>
                    {`${labelText}${isRequired ? ' (required)' : ''}`}
                </p>
            </label>
            { getDescription(descriptionText, textareaId) }
            <textarea
                id={textareaId}
                name={textareaName ? textareaName : textareaId}
                className="block p-1 border rounded-sm bg-white w-full md:w-180"
                maxLength={maxlength}
                rows={rows ? rows : DEFAULT_ROWS}
                cols={cols ? cols : DEFAULT_COLS}
                aria-required={isRequired}
                aria-invalid={!isBlank(errorText)}
                aria-describedby={`${textareaId}-label ${descriptionText ? `${textareaId}-description` : ''} ${errorText ? `${textareaId}-error` : ''}`}>
            </textarea>
            { getError(errorText, textareaId) }
        </div>
    );
}