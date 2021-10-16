// Action types
const ADD_RECIPE = "ADD_RECIPE";
const ADD_SERVING = "ADD_SERVING";
const ADD_INGREDIENTS = "ADD_INGREDIENTS";
const ADD_DIRECTIONS = "ADD_DIRECTIONS";
const EDIT_RECIPE = "EDIT_RECIPE";
const DELETE_RECIPE = "DELETE_RECIPE";

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

export const addServing = (item, id) => {
  return (dispatch) => {
    dispatch({
      type: ADD_SERVING,
      payload: {
        item,
        id,
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

export const addDirections = (item, item2, id) => {
  return (dispatch) => {
    dispatch({
      type: ADD_DIRECTIONS,
      payload: {
        item,
        item2,
        id,
      },
    });
  };
};

export const editRecipe = (item) => {
  return (dispatch) => {
    dispatch({
      type: EDIT_RECIPE,
      payload: {
        item,
      },
    });
  };
};

export const deleteRecipe = (item) => {
  return (dispatch) => {
    dispatch({
      type: DELETE_RECIPE,
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

  if (action.type === ADD_SERVING) {
    let serving = action.payload.item;

    let thisId = action.payload.id;

    let newRecipes = [...state.recipes];
    let index = newRecipes.findIndex((i) => i.id === thisId);

    let thisRecipe = newRecipes[index];
    thisRecipe = { ...thisRecipe, serving };

    newRecipes[index] = thisRecipe;
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
    let prep = action.payload.item2;
    let thisId = action.payload.id;

    let newRecipes = [...state.recipes];
    let index = newRecipes.findIndex((i) => i.id === thisId);

    let thisRecipe = newRecipes[index];
    thisRecipe = { ...thisRecipe, directions, prep };

    newRecipes[index] = thisRecipe;
    return { ...state, recipes: newRecipes };
  }

  if (action.type === EDIT_RECIPE) {
    let updatedRecipe = action.payload.item;
    let newRecipes = [...state.recipes];
    const index = newRecipes.findIndex((item) => item.id === updatedRecipe.id);
    let thisRecipe = newRecipes[index];
    thisRecipe = { ...thisRecipe, ...updatedRecipe };
    newRecipes[index] = thisRecipe;
    return { ...state, recipes: newRecipes };
  }

  if (action.type === DELETE_RECIPE) {
    let thisRecipe = action.payload.item;
    let newRecipes = [...state.recipes];
    newRecipes = newRecipes.filter((c) => c.id !== thisRecipe);

    return { ...state, recipes: newRecipes };
  }

  return state;
};

export default reducer;
