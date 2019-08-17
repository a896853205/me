import { createStore, combineReducers } from 'redux';

import { equipReducer as equipStore } from './equip-model';

const rootReducer = combineReducers({
  equipStore,
});

export const store = createStore(
  rootReducer,
);