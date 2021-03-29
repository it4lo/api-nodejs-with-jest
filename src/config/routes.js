module.exports = (app) => {
  app.route('/users')
    .get(app.routes.users.findAll)
    .post(app.routes.users.store);

  app.route('/accounts')
  .get(app.routes.accounts.findAll)
  .post(app.routes.accounts.store);
}