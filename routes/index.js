const path = require('path');
const authMiddleware = require(path.resolve('./authMiddleware.js'));

module.exports = (app) => {
  // API
  // app.use('/users', authMiddleware, require('./users'));
  // app.use('/user_stores', authMiddleware, require('./user-stores'));
  // app.use('/interactions', authMiddleware, require('./interactions'));

  // app.use('/aro_list', authMiddleware , require('./aro-list'));

  // app.use('/poi', authMiddleware, require('./poi'));

  // // categories
  // app.use('/categories', authMiddleware, require('./categories'));

  // // directions
  // app.use('/directions', authMiddleware,require('./directions'));

  // // memories
  // app.use('/memories', authMiddleware,require('./memories'));

  // // virtual_messages
  // app.use('/virtual_messages', authMiddleware,require('./virtual_messages'));

  // // util
  // app.use('/utils', authMiddleware,require('./utils'));

  // // TODO: move under utils
  // //app.use('/check', authMiddleware, require('./check'));
  // app.use('/check', authMiddleware,require('./check'));
  // app.use('/invitation', authMiddleware,require('./invitation'));

  // app.use('/followers', authMiddleware,require('./followers'));

  // // debug
  // app.get('/health', (req, res, next) => {
  //   res.json({'test': 'API is working'});
  //   next()
  // });

};