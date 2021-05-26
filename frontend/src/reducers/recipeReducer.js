// Action types
const ADD_RECIPE = "ADD_RECIPE";

// Action creators
export const addRecipe = (item) => {
  return (dispatch) => {
    dispatch({
      type: ADD_RECIPE,
      payload: {
        item,
      },
    });
  };
};

// State
const initialState = {
  recipes: [],
};

// Reducer
const reducer = (state = initialState, action) => {
  if (action.type === ADD_RECIPE) {
    let newItem = action.payload.item;
    let newRecipes = [...state.recipes, newItem];

    return { ...state, recipes: newRecipes };
  }

  return state;
};

export default reducer;
