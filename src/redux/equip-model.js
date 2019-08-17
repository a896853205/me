import { handleActions, createAction } from 'redux-actions'

export const actions = {
  recordEquipList: createAction('recordEquipList')
};

export const equipReducer = handleActions({
  recordEquipList(state, { payload: result }) {
    
    return {
      ...state,
      equipList: result
    }
  }
}, {
  equipList: []
})