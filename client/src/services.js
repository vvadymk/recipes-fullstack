import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:9000/api"
});

const apis = {
    getAllRecipes: () => api.get(`recipes/`),
    addRecipe: recipe => api.post(`recipes`, recipe),
    getRecipe: (id) => api.get(`recipes/` + id),
    updateRecipe: (recipe) => api.put(`recipes/${recipe.id}`, recipe),
    deleteRecipe: (id) => api.delete(`recipes/${id}`),
    register: user => api.post(`auth/register`, user)
};

export default apis;
