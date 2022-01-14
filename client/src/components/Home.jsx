import React from "react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  filterCreated,
  filterRecipesByDiets,
  getRecipes,
  orderByName,
} from "../actions";
import Card from "./Card";
import Pages from "./Pages";
import SearchBar from "./SearchBar";

export default function Home() {
  const dispatch = useDispatch();
  const allRecipes = useSelector((state) => state.recipes);
  const [order, setOrder] = useState("");
  const [currentPage, setCurrentPage] = useState(1); // pagina actual
  const [recipesPerPage, setRecipesPerPage] = useState(9);
  const indexOfLastRecipe = currentPage * recipesPerPage;
  const indexOfFirstRecipe = indexOfLastRecipe - recipesPerPage;
  const currentRecipes = allRecipes.slice(
    indexOfFirstRecipe,
    indexOfLastRecipe
  );

  const pages = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  useEffect(() => {
    dispatch(getRecipes());
  }, [dispatch]);

  function handleClick(e) {
    e.preventDefault();
    dispatch(getRecipes());
  }

  function handleFilterStatus(e) {
    dispatch(filterRecipesByDiets(e.target.value));
  }

  function handleFilterCreated(e) {
    dispatch(filterCreated(e.target.value));
  }

  function handleSort(e) {
    e.preventDefault();
    dispatch(orderByName(e.target.value));
    setCurrentPage(1);
    setOrder(`Ordenado ${e.target.value}`); // modificacion del renderizado!
  }

  return (
    <div>
      <Link to="/recipes "> Add Recipe</Link>
      <h1>RECIPES</h1>
      <button
        onClick={(e) => {
          handleClick(e);
        }}
      >
        Volver a cargar
      </button>
      <div>
        <select onChange={(e) => handleSort(e)}>
          <option value="Asc"> A - Z </option>
          <option value="Desc"> Z - A </option>
        </select>

        <select>
          <option value="Asc"> Ascendente </option>
          <option value="Asc"> Ascendente </option>
          <option value="Desc"> Descendente </option>
        </select>

        <select onChange={(e) => handleFilterStatus(e)}>
          <option value="All">all</option>
          <option value="gluten free"> gluten free </option>
          <option value="dairy free"> dairy free </option>
          <option value="lacto ovo vegetarian"> lacto ovo vegetarian </option>
          <option value="vegan"> vegan </option>
          <option value="paleolithic"> paleolithic </option>
          <option value="primal"> primal </option>
          <option value="pescatarian"> pescatarian </option>
          <option value="fodmap friendly"> fodmap friendly </option>
          <option value="whole 30"> whole 30 </option>
        </select>

        <select onChange={(e) => handleFilterCreated(e)}>
          <option value="All"> Todos </option>
          <option value="created"> Creados </option>
          <option value="api"> Api </option>
        </select>

        <Pages
          recipesPerPage={recipesPerPage}
          allRecipes={allRecipes.length}
          pages={pages}
        />

        <SearchBar />

        {currentRecipes?.map((r) => {
          return (
            <div>
              <Link to={"/home/" + r.id}>
                <Card title={r.title} diet={r.diet} image={r.image} />;
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
}
