import { createStore, combineReducers, applyMiddleware } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import { encryptTransform } from 'redux-persist-transform-encrypt';
import storage from 'redux-persist/lib/storage';
import thunk from 'redux-thunk';
import listReducer from './reducers/listReducer';
import detailsReducer from './reducers/detailsReducer';
import responseReducer from './reducers/responseReducer';
import { voteReducer } from './reducers/voteReducer';

const persistConfig = {
  key: 'root',
  storage,
  blacklist: ['list', 'details', 'response'],
  transforms: [
    encryptTransform({
      // It would be better to have a backend that provided the secretKey.
      secretKey: '441699a5ced8d164c26c8380befe22b3eaa6248e2b2ba841b4c939970bce49ba',
      onError: function (error) {
        console.error(error);
        return;
      },
    }),
  ]
};

const rootReducer = combineReducers({
    list: listReducer,
    details: detailsReducer,
    response: responseReducer,
    vote: voteReducer
});
  
const persistedReducer = persistReducer(persistConfig, rootReducer);
 
export const store = createStore(
    persistedReducer, 
    applyMiddleware(thunk)
);

export const persistor = persistStore(store);
