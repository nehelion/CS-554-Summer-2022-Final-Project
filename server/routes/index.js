const imagesRoutes = require('./images');
const queueRoutes = require('./queue');
const usersRoutes = require('./users');
const constructorMethod = (app) => {
  app.use('/images', imagesRoutes);
  app.use('/queue', queueRoutes);
  app.use('/users',usersRoutes);

  app.use('*', (req, res) => {
    res.status(404).json({error: 'Not found'});
  });
};

module.exports = constructorMethod;