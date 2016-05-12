module.exports = {
  DATABASE_URL: process.env.DATABASE_URL || "postgres://localhost:5432/definition",
  PORT: +process.env.PORT || 8000,
  COOKIE_PASSWORD: process.env.COOKIE_PASSWORD || 'leonardoFernandoDosSantosMoura2016noBrasilTop',
  FORCE_SYNC: process.env.FORCE_SYNC || true,

  FACEBOOK_CLIENT_ID: process.env.FACEBOOK_CLIENT_ID || '695939943841690',
  FACEBOOK_CLIENT_SECRET: process.env.FACEBOOK_CLIENT_SECRET || 'd3b5221789a2d0a82545579d027a5127'
};
