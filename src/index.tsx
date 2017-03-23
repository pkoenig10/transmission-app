import "bootstrap";
import * as React from "react";
import * as ReactDOM from "react-dom";
import {Provider} from "react-redux";
import {EnterHook, IndexRedirect, IndexRoute, RedirectFunction, Route, Router, RouterState, hashHistory} from "react-router";
import {Store, applyMiddleware, createStore} from "redux";
import createSagaMiddleware, {SagaMiddleware} from "redux-saga";
import {TransmissionAppContainer} from "./components/TransmissionApp";
import {TransmissionSettingsContainer} from "./components/TransmissionSettings";
import {TransmissionTorrentContainer} from "./components/TransmissionTorrent";
import {TransmissionTorrentListContainer} from "./components/TransmissionTorrentList";
import {transmissionReducer} from "./reducer/TransmissionReducer";
import {rootSaga} from "./sagas/TransmissionSagas";
import {TransmissionState, initialTransmissionState} from "./state/TransmissionState";
import "./style/main";

const redirect: EnterHook = (_nextState: RouterState, replace: RedirectFunction) => {
    replace("/");
};

const sagaMiddleware: SagaMiddleware = createSagaMiddleware();
const store: Store<TransmissionState> = createStore(transmissionReducer, initialTransmissionState, applyMiddleware(sagaMiddleware));

sagaMiddleware.run(rootSaga);

ReactDOM.render(
    <Provider store={store}>
        <Router history={hashHistory}>
            <Route path="/" component={TransmissionAppContainer}>
                <IndexRoute component={TransmissionTorrentListContainer}/>
                <Route path="torrents">
                    <IndexRedirect to="/"/>
                    <Route path=":hashString">
                        <IndexRedirect to="info"/>
                        <Route path=":panel" component={TransmissionTorrentContainer}/>
                    </Route>
                </Route>
                <Route path="settings">
                    <IndexRedirect to="speed"/>
                    <Route path=":panel" component={TransmissionSettingsContainer}/>
                </Route>
                <Route path="*" onEnter={redirect}/>
            </Route>
        </Router>
    </Provider>,
    document.getElementById("root"),
);
