'use strict';
require('dotenv').config();
const stripe = require('stripe')(`${process.env.STRIPE_TEST}`);

module.exports = {
  create: async ctx => {
    const {
      amount,
      prenomProprietaireCarte,
      nomProprietaireCarte,
      emailProprietaireCarte,
      phoneExp,
      prenomExp,
      addresseExp,
      villeExp,
      codePostalExp,
      emailExp,
      nomExp,
      nomDest,
      prenomDest,
      addresseDest,
      villeDest, 
      codePostalDest,
      emailDest,
      phoneDest,
      token
    } = ctx.request.body;

    // Charge the customer
    try {
      await stripe.charges.create({
        // Transform cents to dollars.
        amount: amount * 100,
        currency: 'eur',
        description: `Commande de ${nomProprietaireCarte} ${prenomProprietaireCarte}`,
        source: token,
      });

      // Register the order in the database
      try {
        const commande = await strapi.services.commande.create({
          amount,
          prenomProprietaireCarte,
          nomProprietaireCarte,
          emailProprietaireCarte,
          phoneExp,
          prenomExp,
          addresseExp,
          villeExp,
          codePostalExp,
          emailExp,
          nomExp,
          nomDest,
          prenomDest,
          addresseDest,
          villeDest, 
          codePostalDest,
          emailDest,
          phoneDest,
          token
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
