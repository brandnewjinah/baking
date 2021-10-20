// Action types
const ADD_RECIPE = "ADD_RECIPE";
const ADD_SERVING = "ADD_SERVING";
const ADD_DETAILS = "ADD_DETAILS";
const ADD_INGREDIENTS = "ADD_INGREDIENTS";
const ADD_DIRECTIONS = "ADD_DIRECTIONS";
const EDIT_RECIPE = "EDIT_RECIPE";
const DELETE_RECIPE = "DELETE_RECIPE";
const DELETE_SERVING = "DELETE_SERVING";

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

export const addDetails = (item, id) => {
  return (dispatch) => {
    dispatch({
      type: ADD_DETAILS,
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

export const editRecipe = (name, item, id) => {
  return (dispatch) => {
    dispatch({
      type: EDIT_RECIPE,
      payload: {
        name,
        item,
        id,
      },
    });
  };
};

// export const deleteRecipe = (item) => {
//   return (dispatch) => {
//     dispatch({
//       type: DELETE_RECIPE,
//       payload: {
//         item,
//       },
//     });
//   };
// };

export const deleteRecipe = (id) => {
  return (dispatch) => {
    dispatch({
      type: DELETE_RECIPE,
      payload: {
        id,
      },
    });
  };
};

export const deleteServing = (id) => {
  return (dispatch) => {
    dispatch({
      type: DELETE_SERVING,
      payload: {
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

  if (action.type === ADD_DETAILS) {
    let details = action.payload.item;
    let thisId = action.payload.id;

    let newRecipes = [...state.recipes];
    let index = newRecipes.findIndex((i) => i.id === thisId);

    let thisRecipe = newRecipes[index];
    thisRecipe = { ...thisRecipe, details };

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
    let thisId = action.payload.id;

    let newRecipes = [...state.recipes];
    let index = newRecipes.findIndex((i) => i.id === thisId);

    let thisRecipe = newRecipes[index];
    thisRecipe = { ...thisRecipe, directions };

    newRecipes[index] = thisRecipe;
    return { ...state, recipes: newRecipes };
  }

  if (action.type === EDIT_RECIPE) {
    let name = action.payload.name;
    let item = action.payload.item;
    let thisId = action.payload.id;

    let newRecipes = [...state.recipes];
    let index = newRecipes.findIndex((i) => i.id === thisId);

    let thisRecipe = newRecipes[index];
    thisRecipe = { ...thisRecipe, [name]: item };

    newRecipes[index] = thisRecipe;
    return { ...state, recipes: newRecipes };
  }

  // if (action.type === DELETE_RECIPE) {
  //   let thisRecipe = action.payload.item;
  //   let newRecipes = [...state.recipes];
  //   newRecipes = newRecipes.filter((c) => c.id !== thisRecipe);

  //   return { ...state, recipes: newRecipes };
  // }

  if (action.type === DELETE_RECIPE) {
    let newRecipes = [...state.recipes];
    console.log(newRecipes);
    // newRecipes = newRecipes.filter((c) => c.id !== id);

    // return { ...state, recipes: newRecipes };
  }

  if (action.type === DELETE_SERVING) {
    let thisId = action.payload.id;
    let newRecipes = [...state.recipes];
    let index = newRecipes.findIndex((i) => i.id === thisId);

    let thisRecipe = newRecipes[index];
    delete thisRecipe.prep;

    newRecipes[index] = thisRecipe;
    return { ...state, recipes: newRecipes };
  }

  return state;
};

export default reducer;
