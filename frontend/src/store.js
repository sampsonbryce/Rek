import { createStore } from 'redux';
import mainReducer from './reducers';

const store = createStore(
    mainReducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__() // eslint-disable-line 
);

export default store;
