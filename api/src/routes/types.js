const { default: axios } = require("axios");
const { Router } = require("express");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const { Diet } = require("../db");
const router = Router();
const { getAllDiet } = require("./allData");

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.get("/", async (req, res, next) => {
  const diets = await getAllDiet();
  res.send(diets);
});

router.post("/", async (req, res, next) => {
  try {
    const { name } = req.body;
    const newDiet = await Diet.create({ name });
    res.status(201).send(newDiet);
  } catch (error) {
    next(error);
  }
});

// router.get("/", (req, res, next) => {
//   return Diet.findAll()
//     .then((diet) => {
//       res.send(diet);
//     })
//     .catch((error) => {
//       next(error);
//     });
// });

// router.post("/", (req, res, next) => {
//   const { name } = req.body;
//   return Diet.create({ name }).then((newDiet) => {
//     newDiet;
//      res.status(201).send(newEpisode)
//   });
// });

router.put("/", (req, res, next) => {
  res.send("soy put /diet");
});

router.delete("/", (req, res, next) => {
  res.send("soy delete /diet");
});

module.exports = router;
