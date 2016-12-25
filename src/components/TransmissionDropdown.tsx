import * as $ from "jquery";
import * as React from "react";

export abstract class TransmissionDropdown<P, S> extends React.PureComponent<P, S> {
    protected dropdown: JQuery;

    protected setDropdown = (modal: HTMLElement): void => {
        this.dropdown = $(modal);
    }
}
