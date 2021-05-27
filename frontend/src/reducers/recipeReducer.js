// Action types
const ADD_RECIPE = "ADD_RECIPE";
const ADD_INGREDIENTS = "ADD_INGREDIENTS";

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

export const addIngredients = (item) => {
  return (dispatch) => {
    dispatch({
      type: ADD_INGREDIENTS,
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

  if (action.type === ADD_INGREDIENTS) {
    let newIngredients = action.payload.item;
    console.log(newIngredients);
    // let newRecipes = [...state.recipes, newItem];

    // return { ...state, recipes: newRecipes };
  }

  return state;
};

export default reducer;
