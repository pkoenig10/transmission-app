import * as React from "react";
import {FormComponentProps} from "./FormComponent";

export interface ActionFormComponentProps extends FormComponentProps {
    actionLabel: string;
    actionValue: string | JSX.Element;
    actionOnClick: React.MouseEventHandler<HTMLButtonElement>;
    isLoading: boolean;
}
