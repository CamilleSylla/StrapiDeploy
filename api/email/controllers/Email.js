'use strict'

/**
 * Read the documentation () to implement custom controller functions
 */

module.exports = {
  /**
   * Sends an email to the recipient in the body of the request
   */
  send: async (ctx) => {
      console.log(process.env.EMAIL_PROVIDER);
    const body = ctx.request.body
    const sendTo = body.email
    strapi.log.debug(`Trying to send an email to ${sendTo}`)

    try {
      const emailOptions = {
        to: sendTo,
        from: 'carmelosylla@gmail.com',
        subject: 'This is a test',
        html: `<h1>Welcome!</h1><p>This is a test HTML email.</p>`,
      }
      console.log("Essaie d'envoie ");
      await strapi.plugins['email'].services.email.send(emailOptions)
      strapi.log.debug(`Email sent to ${sendTo}`)
      ctx.send({ message: 'Email sent' })
    } catch (err) {
      strapi.log.error(err)
      strapi.log.error(`Error sending email to ${sendTo}`, err)
      ctx.send({ error: 'Error sending email' })
    }
  },
  test : async (ctx) => {

    const body = ctx.request.body
    const sendTo = body.email
    try {
      console.log("Ici Bg")
      await strapi.plugins['email'].services.email.send({
        to: sendTo,
        from: 'joelrobuchon@strapi.io',
        cc: 'helenedarroze@strapi.io',
        bcc: 'ghislainearabian@strapi.io',
        replyTo: 'annesophiepic@strapi.io',
        subject: 'Use strapi email provider successfully',
        text: 'Hello world!',
        html: 'Hello world!',
      });
      console.log(`envoyer a ${sendTo}`)
    } catch (err) {
      strapi.log.error(err)
    }
    
  }
}