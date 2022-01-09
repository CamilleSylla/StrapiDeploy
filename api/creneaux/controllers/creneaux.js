'use strict';

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-controllers)
 * to customize this controller
 */

module.exports = {
    reservation_number_limitation: async ctx => {
        try {
            const allReservations = await strapi.query('reservations').find()
            const allCreneaux = await strapi.query('creneaux').find()
            allCreneaux.forEach(creneau => {
                const find = allReservations.filter(reservation => reservation.creneau_id == creneau.id)
                creneau.active_reservations = find.length
                if (find.length > 0) {
                    console.log(creneau);
                }
                return creneau
            })
            return allCreneaux


        } catch (err) {
            const { statusCode, message } = err;
                console.log(statusCode, message);
                return ctx.send({message : message}, 500)
        }
    }
};
