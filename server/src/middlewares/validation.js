const validate = require('../services/validation');


function getValidator(schemaName) {
  return (req, res, next) => {
    const error = validate(schemaName, req.body);
    if (error) {
      return res.status(400).send(error);
    }
    next();
  };
};


module.exports = {
  validateLogin: getValidator('login'),
  validateRegistrationn: getValidator('registration'),
};