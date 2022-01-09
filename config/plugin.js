module.exports = ({ env }) => ({
    // ...
    email: {
        provider: 'smtp',
        providerOptions: {
          host: 'smtp.gmail.com', //SMTP Host
          port: 465   , //SMTP Port
          secure: true,
          username: 'carmelosylla@gmail.com',
          password: 'laGalere72',
          rejectUnauthorized: true,
          requireTLS: true,
          connectionTimeout: 1,
        },
        settings: {
          from: 'carmelosylla@gmail.com',
          replyTo: 'carmelosylla@gmail.com',
        },
      },
    // email: {
    //   provider: env('EMAIL_PROVIDER'),
    //   providerOptions: {
    //     host: env('EMAIL_SMTP_HOST', 'smtp.example.com'),
    //     port: env('EMAIL_SMTP_PORT', 587),
    //     auth: {
    //       user: env('EMAIL_SMTP_USER'),
    //       pass: env('EMAIL_SMTP_PASS'),
    //     },
    //   },
    //   settings: {
    //     defaultFrom: env('EMAIL_ADDRESS_FROM'),
    //     defaultReplyTo: env('EMAIL_ADDRESS_REPLY'),
    //   },
    // },
    // ...
  })