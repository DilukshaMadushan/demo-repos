export const addMpList = (item) => {
    return {
        type: 'ADD_MP_LIST',
        item:item,
    }
  }
export const addFollow = (item) => {
    return {
      type: 'ADD_FOLLOW',
      item: item
    }
  } 
 

const initialState = {
    mpList:[],
}

function mpListRedux (state = initialState ,action){
    
    switch(action.type){
        case 'ADD_MP_LIST':
          const newState = { mpList:action.item }     
        return newState
        
        case 'ADD_FOLLOW':
          const indexFollow = state.mpList.indexOf(action.item);
          state.mpList[indexFollow].isFollow = !action.item.isFollow;
          const newState2 = {mpList : [...state.mpList]}
        return newState2

      }
      return state;
}

export default mpListRedux;