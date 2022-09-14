export const changeIsAnonymous = (item) => {
    return {
        type: 'CHANGE_IS_ANONYMOUS',
        item:item,
    }
  }

export const addUserName = (item) => {
    return {
        type: 'ADD_USERNAME',
        item:item,
    }
  }

const initialState = {
    isAnonymous:true,
    userName:""
}

function userDetailsRedux (state = initialState ,action){
    
    switch(action.type){
        case 'CHANGE_IS_ANONYMOUS':
          const newState = { isAnonymous:action.item, userName: state.userName }     
        return newState

        case 'ADD_USERNAME':
          const newState2 = { isAnonymous:state.isAnonymous, userName: action.item }     
        return newState2
        
      }
      return state;
}

export default userDetailsRedux;