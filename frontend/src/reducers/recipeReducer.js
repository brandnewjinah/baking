// Action types
const ADD_RECIPE = "ADD_RECIPE";
const ADD_INGREDIENTS = "ADD_INGREDIENTS";
const ADD_DIRECTIONS = "ADD_DIRECTIONS";

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

export const addIngredients = (item, id) => {
  return (dispatch) => {
    dispatch({
      type: ADD_INGREDIENTS,
      payload: {
        item,
        id,
      },
    });
  };
};

export const addDirections = (item, id) => {
  return (dispatch) => {
    dispatch({
      type: ADD_DIRECTIONS,
      payload: {
        item,
        id,
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
    let ingredients = action.payload.item;
    let thisId = action.payload.id;

    let newRecipes = [...state.recipes];
    let index = newRecipes.findIndex((i) => i.id === thisId);

    let thisRecipe = newRecipes[index];
    thisRecipe = { ...thisRecipe, ingredients };

    newRecipes[index] = thisRecipe;
    return { ...state, recipes: newRecipes };
  }

  if (action.type === ADD_DIRECTIONS) {
    let directions = action.payload.item;
    let thisId = action.payload.id;

    let newRecipes = [...state.recipes];
    let index = newRecipes.findIndex((i) => i.id === thisId);

    let thisRecipe = newRecipes[index];
    thisRecipe = { ...thisRecipe, directions };

    newRecipes[index] = thisRecipe;
    return { ...state, recipes: newRecipes };
  }

  return state;
};

export default reducer;
