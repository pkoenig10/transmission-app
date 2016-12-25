import * as $ from "jquery";
import * as React from "react";

export abstract class TransmissionModal<P, S> extends React.PureComponent<P, S> {
    protected modal: JQuery;

    protected setModal = (modal: HTMLElement): void => {
        this.modal = $(modal);
    }
}
