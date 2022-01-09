module.exports = ({ env }) => ({
  host: env('HOST', '0.0.0.0'),
  port: env.int('PORT', 1337),
  admin: {
    auth: {
      secret: env('ADMIN_JWT_SECRET', 'e5ebe33d0d3b3291381af7d9308be6ab'),
    },
  },
  cron : {enabled: true}
});
