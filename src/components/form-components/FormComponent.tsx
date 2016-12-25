export interface FormComponentProps {
    label?: string;
    disabled?: boolean;
    readOnly?: boolean;
}

export function inputOnKeyPress(event: React.KeyboardEvent<HTMLInputElement>): void {
    if (event.key === "Enter") {
        event.currentTarget.blur();
    }
}
