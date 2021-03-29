module.exports = (app) => {
  const index = (filter = {}) => {
    return app.db('users').where(filter).select();
  }

  const store = async (user) => {
    if (!user.name) return { error: 'Name is required' }
    if (!user.mail) return { error: 'Mail is required' }
    if (!user.passwd) return { error: 'Password is required' }

    const userDb = await index({ mail: user.mail });
    if (userDb && userDb.length > 0) return { error: 'Usuário existente' };

    return app.db('users').insert(user, '*');
  }

  return { index, store }
}