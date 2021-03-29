module.exports = (app) => {

  const findAll = async (req, res) => {
    const result = await app.services.accounts.index();
    res.status(200).json(result);
  };

  const store = async (req, res) => {
    const account = await app.services.accounts.store(req.body);
    return res.status(201).json(account[0]);
  };

  return { findAll, store }

}
