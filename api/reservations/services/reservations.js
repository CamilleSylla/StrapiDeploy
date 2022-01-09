'use strict';

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-services)
 * to customize this service
 */

function getWeek (date) {
    const firstJan = new Date (date.getFullYear(),0,4);
    const today = new Date (date.getFullYear(), date.getMonth(), date.getDate())
    const dayOfYear = ((today - firstJan + 86400000)/86400000)
    return Math.ceil(dayOfYear/7)
}

module.exports = {
    verifyBook : async (body) => {
        const {user_id, traning_day ,traning_start} = body
            try {

                const {book_limit} = await strapi
            .query("user", "users-permissions")
            .findOne({ id: user_id });
            const allUserBooked = await strapi
            .query('reservations')
            .find({user_id : user_id})
            const filterByWeekNumber = allUserBooked.filter(asBooked => { 
                const userDate = getWeek(new Date(asBooked.reservation_le))
                const newBook = getWeek(new Date (body.reservation_le))
                if (userDate === newBook) {
                    return asBooked
                }
             })
            const alreadyBooked = await strapi.query('reservations').findOne({traning_day: traning_day, user_id: user_id, traning_start: traning_start})
            if (!book_limit) {
                throw new Error('Validation Error : User does not exist')
            }
            if (alreadyBooked) {
                throw new Error('Validation Error : User as already booked this training')
            }
            if (book_limit == filterByWeekNumber.length) {
                throw new Error(`Validation Error : User as reach his booking limit (${book_limit}) for the week ${getWeek(new Date (body.reservation_le))}`)
            }

            const result = await strapi.query('reservations').create(body)
            return result

            } catch (err) {
                return err
            }
            
    }
};
