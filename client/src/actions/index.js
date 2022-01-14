import axios from "axios";

export function getRecipes() {
  return async function (dispatch) {
    var json = await axios.get("http://localhost:3001/api/recipe");
    return dispatch({
      type: "GET_RECIPES",
      payload: json.data,
    });
  };
}
//hacer con promesas.
export function getNameRecipes(payload) {
  return async function (dispatch) {
    try {
      var json = await axios.get(
        `http://localhost:3001/api/recipe?name=${payload}`
      );
      return dispatch({
        type: "GET_NAME_RECIPES",
        payload: json.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export function getDiets() {
  return async function (dispatch) {
    var json = await axios.get("http://localhost:3001/api/types", {});
    return dispatch({
      type: "GET_DIETS",
      payload: json.data,
    });
  };
}

export function postRecipe(payload) {
  return async function (dispatch) {
    const json = await axios.post("http://localhost:3001/api/recipe", payload);
    console.log(json);
    return json;
  };
}

export function filterRecipesByDiets(payload) {
  return {
    type: "FILTER_BY_DIETS",
    payload,
  };
}

export function filterCreated(payload) {
  return {
    type: "FILTER_CREATED",
    payload,
  };
}

export function orderByName(payload) {
  return {
    type: "ORDER_BY_NAME",
    payload,
  };
}
