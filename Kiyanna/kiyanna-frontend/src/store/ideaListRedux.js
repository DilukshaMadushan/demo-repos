export const addIdeaList = (item) => {
    return {
        type: 'ADD_IDEA_LIST',
        item:item,
    }
  }
export const addLike = (item) => {
    return {
      type: 'ADD_LIKE',
      item: item
    }
  } 
  

const initialState = {
    ideaList:[],
}

function ideaListRedux (state = initialState ,action){
    
    switch(action.type){
        case 'ADD_IDEA_LIST':
          const newState = { ideaList:action.item }     
        return newState
        
        case 'ADD_LIKE':
          const indexLike = state.ideaList.indexOf(action.item);
          const isLikedIdea = action.item.isLiked;
          state.ideaList[indexLike].isLiked = !isLikedIdea;
          if (isLikedIdea){
            state.ideaList[indexLike].likes = action.item.likes-1;
          }else{
            state.ideaList[indexLike].likes = action.item.likes+1;
          }
          const newState2 = {ideaList : [...state.ideaList]}
        return newState2

      }
      return state;
}


export default ideaListRedux;