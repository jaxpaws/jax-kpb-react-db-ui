export interface DialogModel {
    isOpen: boolean;
    id: string;
    title: React.ReactNode;
    children: React.ReactNode;
    type?: 'info' | 'error' | 'success';
    heightCss?: string;
    widthCss?: string;
    onClose?: (event: any) => void;
}