import { ErrorModel } from '../models';

export function ifErrorThenGetErrorText(errors: Map<string, ErrorModel>, fieldInputId: string) {
    return (errors && errors.size > 0 && errors.has(fieldInputId)) ? errors.get(fieldInputId)?.message : '';
}