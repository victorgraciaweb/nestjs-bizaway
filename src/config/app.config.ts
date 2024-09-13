export const EnvConfiguration = () => ({
    globalPrefix: process.env.GLOBAL_PREFIX,
    corsEnabled: process.env.CORS_ENABLED,
    port: process.env.PORT,
    urlBizaway: process.env.URL_BIZAWAY,
    apiKeyBizaway: process.env.API_KEY_BIZAWAY
});