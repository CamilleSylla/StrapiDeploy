'use strict';

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-controllers)
 * to customize this controller
 */

module.exports = {
    verify : async ctx => {
        const {body} = ctx.request
        console.log(body);
        const freeUserExist = await strapi.query('reservation-essaie').findOne({email : body.email})
        const currentCreneau = await strapi.query('creneaux').findOne({id: body.spot_id})
        const userIsMember = await strapi.query('user', 'users-permissions').findOne({email : body.email})
        if (freeUserExist) {
            console.log(freeUserExist);
            return "Cette adresse mail a deja été utilisé, pour reserver un nouveau creaneau veuillez souscrire un abonnement en salle"
        }
        if (userIsMember) {
            console.log(userIsMember);
            return "Vous posseder deja un compte membre, veuillez vous connecter pour reserver un spot"
        }
        if (!currentCreneau) {
            console.log(currentCreneau);
            return "La séance que vous venez de choisir n'existe pas"
        }

        body.time = currentCreneau.start
        body.day = currentCreneau.jour.nom
        
        const createFreeReservation = await strapi.query('reservation-essaie').create(body)

        return (createFreeReservation)
    }
};
