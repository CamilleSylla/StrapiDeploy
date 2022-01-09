// module.exports = ({ env }) => ({
//   defaultConnection: 'default',
//   connections: {
//     default: {
//       connector: 'bookshelf',
//       settings: {
//         client: 'postgres',
//         host: env('DATABASE_HOST', '127.0.0.1'),
//         port: env.int('DATABASE_PORT', 5432),
//         database: env('DATABASE_NAME', 'sammy'),
//         username: env('DATABASE_USERNAME', ''),
//         password: env('DATABASE_PASSWORD', ''),
//       },
//       options: {
//         ssl: false,
//       },
//     },
//   },
// });
module.exports = ({ env }) => ({
  defaultConnection: "default",
  connections: {
    default: {
      connector: "bookshelf",
      settings: {
        client: "postgres",
        host: env("DATABASE_HOST", "app-32495bb7-5ce0-4916-a95f-5d6da278e512-do-user-10569707-0.b.db.ondigitalocean.com"),
        port: env.int("DATABASE_PORT", 25060),
        database: env("DATABASE_NAME", "dunesdb"),
        username: env("DATABASE_USERNAME", "dunesdb"),
        password: env("DATABASE_PASSWORD", "sasQFUkVvBmsLEiL"),
        schema: env("DATABASE_SCHEMA", "public"),
      },
      options: {},
    },
  },
});
