const recipe = require('../entities/recipe/recipe.routes');


module.exports = app => {
	app.use('/api/recipes', recipe);
	app.use('/api/auth', require('../entities/auth/auth.routes'));
};
