const { Router } = require("express");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const { Recipe } = require("../db");
const router = Router();
const { getApiInfo, getDbInfo, getAllRecipes } = require("./allData");

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

// router.get("/", (req, res, next) => {
//   return Recipe.findAll()
//     .then((recipes) => {
//       res.send(recipes);
//     })
//     .catch((error) => {
//       next(error);
//     });
// });

router.get("/", async (req, res, next) => {
  const name = req.query.name;
  let recipesTotal = await getAllRecipes();
  if (name) {
    let recipeTitle = await recipesTotal.filter((r) =>
      r.title.toLowerCase().includes(name.toLowerCase())
    );
    recipeTitle.length
      ? res.status(200).send(recipeTitle)
      : res.status(404).send("No se encontro la receta");
  } else {
    res.status(200).send(recipesTotal);
  }
});

router.get("/:id", async (req, res, next) => {
  const { id } = req.params;

  const recipes = await getAllRecipes();
  if (id) {
    const recipesID = await recipes.filter((r) => r.id == id);
    recipesID.length
      ? res.send(recipesID)
      : res.send("No se encontró receta :/");
  } else {
    res.send("Ingresar un ID");
  }
});

router.post("/", async (req, res, next) => {
  try {
    const { title, summary, spoonacularScore, healthScore, image } = req.body;
    const newRecipe = await Recipe.create({
      title,
      summary,
      spoonacularScore,
      healthScore,
      image,
    });
    res.status(201).send(newRecipe);
  } catch (error) {
    next(error);
  }
});

router.put("/", (req, res, next) => {
  res.send("soy put /recipe");
});

router.delete("/", (req, res, next) => {
  res.send("soy delete /recipe");
});

module.exports = router;
