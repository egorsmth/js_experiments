const joi = require('joi');

const schemas = {
  login: joi.object({
    username: joi.string().max(20).min(3).required(),
    password: joi.string().max(20).min(3).required(),
  }),
  registration: joi.object({
    username: joi.string().max(20).min(3).required(),
    password: joi.string().max(20).min(3).required(),
  }),
}

function validate(schemaName, data) {
  const schema = schemas[schemaName];
  if (!schema) throw new Error('No such schema');
  const { error } = schema.validate(data);
  return error;
}

module.exports = validate;