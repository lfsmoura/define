module.exports = {
  DATABASE_URL: process.env.DATABASE_URL || "postgres://localhost:5432/definition",
  PORT: +process.env.PORT || 8000,
  COOKIE_PASSWORD: process.env.COOKIE_PASSWORD || 'leonardoFernandoDosSantosMoura2016noBrasilTop',
  FORCE_SYNC: process.env.FORCE_SYNC || false;
}
