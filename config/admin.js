module.exports = ({ env }) => ({
  auth: {
    secret: env('ADMIN_JWT_SECRET', '32685d3b976f5695f55ebaaa409e19fb'),
  },
});
