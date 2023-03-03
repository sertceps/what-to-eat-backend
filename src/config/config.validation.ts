import * as Joi from 'joi';

export const configValidation = Joi.object({
  COMMON_PORT: Joi.number().required().default(3000),
  COMMON_AMAP_KEY: Joi.string().required(),
});
