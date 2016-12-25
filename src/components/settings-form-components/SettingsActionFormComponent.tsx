import * as React from "react";
import {TransmissionActionCreator} from "../../actions/TransmissionActions";
import {SettingsFormComponentProps} from "./SettingsFormComponent";

export interface SettingsActionFormComponentProps extends SettingsFormComponentProps {
    actionLabel: string;
    actionValue: string | JSX.Element;
    actionCreator: TransmissionActionCreator<never>;
    isLoading: boolean;
}

export function settingsActionOnClick(props: SettingsActionFormComponentProps): React.MouseEventHandler<HTMLButtonElement> {
    return (): void => {
        props.dispatch(props.actionCreator());
    };
}
