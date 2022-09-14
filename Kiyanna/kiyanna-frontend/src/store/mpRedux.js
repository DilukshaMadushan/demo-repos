export const addItem = (id) => {
      return {
          type: 'ADD_ITEM',
          item:id,
      }
    }
    
  
  const initialState = {
      item:null,
  }
  
  function mpRedux (state = initialState ,action){
      
      switch(action.type){
          case 'ADD_ITEM':
            const newState = { item:action.item }     
            return newState;
        }
        return state;
  }
  
  
  export default mpRedux;