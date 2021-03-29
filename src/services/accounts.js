module.exports = (app) => {

  const index = async (filter = {}) => {
    return app.db('accounts').where(filter).select();
  }

  const store = async (account) => {
    return app.db('accounts').insert(account, '*');
  }

  return { index, store }
}