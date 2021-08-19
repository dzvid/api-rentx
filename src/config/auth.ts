require('dotenv/config');

export default {
  secret_token: process.env.APP_SECRET,
  expires_in_token: process.env.APP_TOKEN_EXPIRES_IN,
  secret_refresh_token: process.env.APP_SECRET_REFRESH_TOKEN,
  expires_in_refresh_token: process.env.APP_REFRESH_TOKEN_EXPIRES_IN,
  expires_in_refresh_token_days: process.env.APP_REFRESH_TOKEN_EXPIRES_IN_DAYS,
};
