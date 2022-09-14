import {createStore,combineReducers} from 'redux';
import mpRedux from './mpRedux';
import ideaListRedux from './ideaListRedux';
import mpListRedux from './mpListRedux';
import userDetailsRedux from './userDetailsRedux';

const rootReducer = combineReducers({
    mpRedux : mpRedux,
    ideaListRedux : ideaListRedux,
    mpListRedux : mpListRedux,
    userDetailsRedux : userDetailsRedux

});

const configureStore = () =>{
    return createStore(rootReducer);
};

export default configureStore;