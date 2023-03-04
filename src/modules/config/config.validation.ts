import * as Joi from 'joi';

export const configValidation = Joi.object({
  PORT: Joi.number().required().default(3000),
  AMAP_KEY: Joi.string().required(),
  AMAP_API_URL: Joi.string().required().default('https://restapi.amap.com/v5/place/around?parameters'),
  AMAP_POI_TYPE: Joi.string().required().default('050000'),
});
