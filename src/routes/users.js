module.exports = (app) => {

  const findAll = async (req, res) => {
   app.services.users.index().then(result => res.status(200).json(result));
    //res.status(200).json(result.data);
  };

  const store = async (req, res) => {
    const restult = await app.services.users.store(req.body);
    if(restult.error) res.status(400).json(restult);
    res.status(201).json(restult[0]);
  };

  return { findAll, store }

}
