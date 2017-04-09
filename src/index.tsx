import "bootstrap";
import * as React from "react";
import * as ReactDOM from "react-dom";
import {Provider} from "react-redux";
import {HashRouter} from "react-router-dom";
import {Store, applyMiddleware, createStore} from "redux";
import createSagaMiddleware, {SagaMiddleware} from "redux-saga";
import {TransmissionAppContainer} from "./components/TransmissionApp";
import {transmissionReducer} from "./reducer/TransmissionReducer";
import {rootSaga} from "./sagas/TransmissionSagas";
import {TransmissionState, initialTransmissionState} from "./state/TransmissionState";
import "./style/main";

const sagaMiddleware: SagaMiddleware = createSagaMiddleware();
const store: Store<TransmissionState> = createStore(transmissionReducer, initialTransmissionState, applyMiddleware(sagaMiddleware));

sagaMiddleware.run(rootSaga);

ReactDOM.render(
    <Provider store={store}>
        <HashRouter>
            <TransmissionAppContainer/>
        </HashRouter>
    </Provider>,
    document.getElementById("root"),
);
