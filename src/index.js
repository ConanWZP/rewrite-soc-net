import React from 'react';
import './index.css';


import ReactDOM from 'react-dom/client';
import App, {MainApp} from './App';
import {Provider} from "react-redux";
import store from "./redux/redux-store";



const root = ReactDOM.createRoot(document.getElementById('root'));

/*let rerenderEntireTree = (state) => {
    root.render(
        <React.StrictMode>
            <Provider store={store}>
                {/!*<App AppState={state} dispatch={store.dispatch.bind(store)} store={store} />*!/}
                <App  />
            </Provider>
        </React.StrictMode>
    );
}*/


root.render(
    /*<React.StrictMode>
        <Provider store={store}>
            {/!*<App AppState={state} dispatch={store.dispatch.bind(store)} store={store} />*!/}
            <App  />
        </Provider>
    </React.StrictMode>*/
    <React.StrictMode>
        <MainApp />

    </React.StrictMode>

);





/*rerenderEntireTree(store.getState());*/

/*store.subscribe(rerenderEntireTree);*/
/*store.subscribe(() => {
    let state = store.getState();
    rerenderEntireTree(state);
});*/

