import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { postRecipe, getDiets } from "../actions";
import { useDispatch, useSelector } from "react-redux";

export default function RecipeCreate() {
  const dispatch = useDispatch();
  const diets = useSelector((state) => state.diets);

  const [input, setInput] = useState({
    title: "",
    summary: "",
    spoonacularScore: "",
    healthScore: "",
    steps: [],
    image: "",
    diets: [],
  });

  function handleChange(e) {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  }

  function handleCheck(e) {
    if (e.target.checked) {
      setInput({
        ...input,
        diets: [...input.diets, e.target.value],
      });
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    dispatch(postRecipe(input));
    alert("Receta creada");
    setInput({
      title: "",
      summary: "",
      spoonacularScore: "",
      healthScore: "",
      steps: [],
      image: "",
      diets: [],
    });
  }

  useEffect(() => {
    dispatch(getDiets());
  }, [dispatch]);

  return (
    <div>
      <Link to="/home">
        <button>volver</button>
      </Link>
      <h2>CREA TU RECETA</h2>
      <form onSubmit={(e) => handleSubmit(e)}>
        <div>
          <label>Title</label>
          <input
            type="text"
            value={input.title}
            name="title"
            onChange={(e) => handleChange(e)}
          />

          <label>Summary</label>
          <input
            type="text"
            value={input.summary}
            name="summary"
            onChange={(e) => handleChange(e)}
          />

          <label>Spoonacular Score</label>
          <input
            type="number"
            value={input.spoonacularScore}
            name="spoonacularScore"
            onChange={(e) => handleChange(e)}
          />

          <label>Health score</label>
          <input
            type="number"
            value={input.healthScore}
            name="healthScore"
            onChange={(e) => handleChange(e)}
          />

          <label>Image</label>
          <input
            type="text"
            value={input.image}
            name="image"
            onChange={(e) => handleChange(e)}
          />

          <label>Diets</label>
          <label>
            <input
              type="checkbox"
              name="gluten free"
              value="gluten free"
              onChange={(e) => handleCheck(e)}
            />
            gluten free
          </label>

          <label>
            <input
              type="checkbox"
              name="dairy free"
              value="dairy free"
              onChange={(e) => handleCheck(e)}
            />
            dairy free
          </label>

          <label>
            <input
              type="checkbox"
              name="lacto ovo vegetarian"
              value="lacto ovo vegetarian"
              onChange={(e) => handleCheck(e)}
            />
            lacto ovo vegetarian
          </label>

          <label>
            <input
              type="checkbox"
              name="vegan"
              value="vegan"
              onChange={(e) => handleCheck(e)}
            />
            vegan
          </label>

          <label>
            <input
              type="checkbox"
              name="paleolithic"
              value="paleolithic"
              onChange={(e) => handleCheck(e)}
            />
            paleolithic
          </label>

          <label>
            <input
              type="checkbox"
              name="primal"
              value="primal"
              onChange={(e) => handleCheck(e)}
            />
            primal
          </label>

          <label>
            <input
              type="checkbox"
              name="pescatarian"
              value="pescatarian"
              onChange={(e) => handleCheck(e)}
            />
            pescatarian
          </label>

          <label>
            <input
              type="checkbox"
              name="fodmap friendly"
              value="fodmap friendly"
              onChange={(e) => handleCheck(e)}
            />
            fodmap friendly
          </label>

          <label>
            <input
              type="checkbox"
              name="whole 30"
              value="whole 30"
              onChange={(e) => handleCheck(e)}
            />
            whole 30
          </label>
        </div>

        <button type="submit">crear receta</button>
      </form>
    </div>
  );
}
