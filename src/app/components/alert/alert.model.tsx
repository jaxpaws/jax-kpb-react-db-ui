import { AlertType } from './alertType.model';

export interface AlertModel {
    id: string;
    type: AlertType;
    header: string;
    body: string;
    onClose: () => void;
}