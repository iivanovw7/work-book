import Joi from 'joi';

Joi.objectId = require('joi-objectid')(Joi);

export const login = {
  body: {
    email: Joi.string().email({ minDomainAtoms: 2 }).required(),
    password: Joi.string().required()
  }
};

export const checkToken = {
  query: {
    token: Joi.string().required()
  }
};
