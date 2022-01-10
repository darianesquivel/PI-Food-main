const initialState = {
  recipes: [],
};

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case "GET_RECIPES":
      return {
        ...state,
        recipes: action.payload,
      };
    case "FILTER_BY_DIETS":
      const allRecipes = state.recipes;
      const statusFiltered =
        action.payload === "all"
          ? allRecipes
          : allRecipes.filter((r) => r.diets === action.payloud);
      return {
        ...state,
        recipes: statusFiltered,
      };
    default:
      return state;
  }
}

export default rootReducer;
