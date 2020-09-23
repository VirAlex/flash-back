'use strict';
const stripe = require('stripe')('sk_test_51H5slxCIQMePPibU6ev9icIS8hZjBZluaaZvrSESh65bDJhONGVaxECUQcEgYqxaOmkGAUc7KIQoCITjAJjf8iOr00WVEvi7Om');

module.exports = {
  create: async ctx => {
    console.log(ctx.request.body)
    const {
      firstname,
      amount,
      lastname,
      email,
      token
    } = ctx.request.body;

    // Charge the customer
    try {
      await stripe.charges.create({
        // Transform cents to dollars.
        amount: amount,
        currency: 'eur',
        description: `Test`,
        source: token,
      });

      // Register the order in the database
      try {
        const commande = await strapi.services.commande.create({
          firstname,
          amount,
          lastname,
          email
        });

        return commande;
      } catch (err) {
        // Silent
      }
    } catch (err) {
    //   // Silent
    }
  },
};
