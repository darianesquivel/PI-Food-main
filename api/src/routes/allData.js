const axios = require("axios");
const { Recipe, Diet } = require("../db");
const { API_KEY, API_KEY2 } = process.env;

const getApiInfo = async () => {
  const apiUrl = await axios.get(
    `https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY2}&number=100&addRecipeInformation=true`
  );
  const apiInfo = await apiUrl.data.results.map((e) => {
    return {
      id: e.id,
      title: e.title,
      summary: e.summary,
      spoonacularScore: e.spoonacularScore,
      healthScore: e.healthScore,
      steps: e.analyzedInstructions[0]?.steps.map((s) => s.step),
      image: e.image,
      diets: e.diets.map((d) => {
        return { name: d };
      }),
    };
  });
  return apiInfo;
};

const getDbInfo = async () => {
  return await Recipe.findAll({
    include: {
      model: Diet,
      attributes: ["name"],
      through: {
        attributes: [],
      },
    },
  });
};

const getAllRecipes = async () => {
  const apiInfo = await getApiInfo();
  const dbInfo = await getDbInfo();
  const totalInfo = apiInfo.concat(dbInfo);
  return totalInfo;
};

const getAllDiet = async () => {
  const dietInfoApi = await axios.get(
    `https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY2}&number=100&addRecipeInformation=true`
  );

  const dietsApi = await dietInfoApi.data.results.map((d) => d.diets);

  const dietsEach = [];
  dietsApi.map((e) => {
    for (let i = 0; i < e.length; i += 1) dietsEach.push(e[i]);
  });

  dietsEach.forEach((f) => {
    Diet.findOrCreate({ where: { name: f } });
  });

  const allDiets = await Diet.findAll();

  return allDiets;
};

module.exports = {
  getApiInfo,
  getDbInfo,
  getAllRecipes,
  getAllDiet,
};
