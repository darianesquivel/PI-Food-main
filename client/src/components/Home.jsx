import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { filterRecipesByDiets, getRecipes } from "../actions";
import { Link } from "react-router-dom";
import Card from "./Card";
import Pages from "./Pages";

export default function Home() {
  const dispatch = useDispatch();
  const allRecipes = useSelector((state) => state.recipes);
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
        <select>
          <h3>Alfabetico</h3>
          <option value="asc"> Ascendente </option>
          <option value="desc"> Descendente </option>
        </select>
        <select>
          <h3>Puntuacion</h3>
          <option value="asc"> Ascendente </option>
          <option value="desc"> Descendente </option>
        </select>

        <select onChange={(e) => handleFilterStatus(e)}>
          <option value="all"></option>
          <option value="gluten free"> gluten free </option>
          <option value="daiFree"> dairy free </option>
          <option value="lactoOvo"> lacto ovo vegetarian </option>
          <option value="vegan"> vegan </option>
          <option value="paleo"> paleolithic </option>
          <option value="prim"> primal </option>
          <option value="pesc"> pescatarian </option>
          <option value="fodFri"> fodmap friendly </option>
          <option value="who"> whole 30 </option>
        </select>

        <select>
          <h3>Puntuacion</h3>
          <option value="all"> Todos </option>
          <option value="created"> Creados </option>
          <option value="api"> Api </option>
        </select>

        <Pages
          recipesPerPage={recipesPerPage}
          allRecipes={allRecipes.length}
          pages={pages}
        />

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
