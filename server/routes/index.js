const imagesRoutes = require('./images');
const usersRoutes = require('./users');
const constructorMethod = (app) => {
  app.use('/images', imagesRoutes);
  app.use('/users',usersRoutes);

  app.use('*', (req, res) => {
    res.status(404).json({error: 'Not found'});
  });
};

module.exports = constructorMethod;