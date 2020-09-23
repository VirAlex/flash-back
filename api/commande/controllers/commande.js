'use strict';
const stripe = require('stripe')('sk_test_51H5slxCIQMePPibU8Ld76H0Tteu7V7KOkJQk0TZGNijyXCbg7Hiqfah1cCa4nDV6hvT3ABtwE2QWZ2ZhiI8uiGFr00CIH0w8vo');

module.exports = {
  create: async ctx => {
    console.log(ctx.request.body)
    const {
      firstName,
      amount,
      lastName,
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
        const commande = await strapi.services.commandes.create({
          firstName,
          amount,
          lastName,
          email
        });

        return commande;
      } catch (err) {
        // Silent
      }
    } catch (err) {
      // Silent
    }
  },
};
