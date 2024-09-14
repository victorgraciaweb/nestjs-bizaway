import * as Joi from 'joi';

export const JoiValidationSchema = Joi.object({
    GLOBAL_PREFIX: Joi.required().default('api/v1'),
    PORT: Joi.number().default(3000),
    CORS_ENABLED: Joi.boolean().default(true),
    MONGODB: Joi.string().required(),
    TITLE_SWAGGER: Joi.string().required(),
    DESCRIPTION_SWAGGER: Joi.string().required(),
    VERSION_SWAGGER: Joi.string().required(),
    URL_BIZAWAY: Joi.string().required(),
    API_KEY_BIZAWAY: Joi.string().required()
})