'use strict';

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-controllers)
 * to customize this controller
 */

module.exports = {
    book: async ctx => {

        if (ctx.request && ctx.request.header && ctx.request.header.authorization) {
            try {
                const { body } = ctx.request
                const { verifyBook } = strapi.services.reservations;
    
                const auth = await strapi.plugins[
                    'users-permissions'
                  ].services.jwt.getToken(ctx);
        
                if (!auth) {
                    throw new Error('Validation Error: User should be authenticated')
                }
                
                if (body.user_id === null) {
                    throw new Error('Validation Error: User ID should not be null')
                }
        
                if (body.traning_day === null) {
                    throw new Error('Validation Error: booking date should not be null')
                }
                if (body.traning_start === null) {
                    throw new Error('Validation Error: traning start should not be null')
                }
                
                const verifyResult = await verifyBook(body)

                if ( verifyResult.name === "Error") {
                    throw new Error(verifyResult.message)
                }
                return verifyResult
            } catch (err) {
                const { statusCode, message } = err;
                console.log(statusCode, message);
                return ctx.send({message : message}, 500)
            }
            
        }
        
    },
    annulation: async ctx => {
        const { body } = ctx.request
    //     // if (ctx.request &&  ctx.request.header.authorization && body) {
    //         try {
                const auth = await strapi.plugins[
                    'users-permissions'
                ].services.jwt.getToken(ctx);
                if (!auth) {
                    throw new Error('Validation Error: User should be authenticated')
                }
                const findReservation = await strapi.query('reservations').findOne({id : body.id})
                if (Number(auth.id) === Number(findReservation.user_id)) {
                    const deleteReservation = await strapi.query('reservations').delete({id : body.id})
                    return "La reservation a bien été annuler"
                } else {
                    return "Oups, il y a eu un problème, veuillez rééssayer ultérierement"
                }
    },
    user_reservations: async ctx => {
        console.log(ctx.request.header.authorization);
        if (ctx.request && ctx.request.header && ctx.request.header.authorization) {
            const auth = await strapi.plugins[
                'users-permissions'
            ].services.jwt.getToken(ctx);
            console.log(auth);
            if (!auth) {
                throw new Error('Validation Error: User should be authenticated')
            }
            const userReservations = await strapi.query('reservations').find({user_id : auth.id})
            console.log(userReservations.length);
            return userReservations
        }
    }
};