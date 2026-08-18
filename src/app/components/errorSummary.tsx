import { ErrorModel } from '../models';

export function ErrorSummary({ errors }: { errors: string }) {
    function handleErrorClick(inputId: string) {
        document.getElementById(inputId)?.focus();
    }

    return (
        <div role="alert" className="bg-white rounded-xl">
            <div className="bg-red-600 p-2 text-white rounded-t-xl">
                <h2 id="error-header" className="text-lg" tabIndex={-1}>There are {JSON.parse(errors).length} errors in this form</h2>
            </div>
            <div id="error-body" className="p-2">
                <ul className="list-disc ml-4">
                    { 
                        JSON.parse(errors).map((error: ErrorModel) => {
                            return (
                                <li key={`${error.inputId}-error-key`}>
                                    <a href={`#${error.inputId}`} id={`${error.inputId}-error`} className="underline" onClick={(event: any) => handleErrorClick(error.inputId)}>
                                        { `${error.fieldName}: ${error.message}` }
                                    </a>
                                </li>
                            );
                        })
                    }
                </ul>
            </div>
        </div>
    );
}