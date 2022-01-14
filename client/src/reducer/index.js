const initialState = {
  recipes: [],
  allRecipes: [],
  diets: [],
};

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case "GET_RECIPES":
      return {
        ...state,
        recipes: action.payload,
        allRecipes: action.payload,
      };
    case "GET_NAME_RECIPES": {
      return {
        ...state,
        recipes: action.payload,
      };
    }

    case "GET_DIETS":
      return {
        ...state,
        diets: action.payload,
      };

    case "ORDER_BY_NAME":
      let sortedArr =
        action.payload === "Asc"
          ? state.recipes.sort(function (a, b) {
              if (a.title > b.title) {
                return 1;
              }
              if (b.title > a.title) {
                return -1;
              }
              return 0;
            })
          : state.recipes.sort(function (a, b) {
              if (a.title > b.title) {
                return -1;
              }
              if (b.title > a.title) {
                return 1;
              }
              return 0;
            });
      return {
        ...state,
        recipes: sortedArr,
      };
    case "FILTER_BY_DIETS":
      const allRecipes = state.allRecipes;
      const recipesFiltered =
        action.payload === "All"
          ? allRecipes
          : allRecipes.filter((r) => {
              let name = r.diets.map((d) => d.name);
              if (name.includes(action.payload)) return r;
            });
      return {
        ...state,
        recipes: recipesFiltered,
      };

    case "POST_RECIPE":
      return {
        ...state,
      };
    case "FILTER_CREATED":
      const allRecipes2 = state.allRecipes;
      const createdFilter =
        action.payload === "created"
          ? allRecipes2.filter((r) => r.createInDb)
          : allRecipes2.filter((r) => !r.createInDb);
      return {
        ...state,
        recipes: action.payload === "All" ? allRecipes2 : createdFilter,
      };

    default:
      return state;
  }
}

export default rootReducer;
