'use strict';

/**
 * Cron config that gives you an opportunity
 * to run scheduled jobs.
 *
 * The cron format consists of:
 * [SECOND (optional)] [MINUTE] [HOUR] [DAY OF MONTH] [MONTH OF YEAR] [DAY OF WEEK]
 *
 * See more details here: https://strapi.io/documentation/developer-docs/latest/setup-deployment-guides/configurations.html#cron-tasks
 */

module.exports = {
  '* 0/59 0/23 * * *': async () => {
    const reservations = await strapi.query('reservations').find()
    const deleteOldResevations = reservations.map(reservation => {
      const convertStringToDate = new Date(reservation.reservation_le).toISOString().slice(0,10)
      if (new Date (convertStringToDate) < new Date()) {
        strapi.query('reservations').delete({
          id: reservation.id
        })
        console.log(`The locked spot ${reservation.user_name} of '${reservation.traning_name}' on ${convertStringToDate} at ${reservation.traning_start} as been deleted`);
      }
    })
  },
};
