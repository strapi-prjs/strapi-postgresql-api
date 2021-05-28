const { sanitizeEntity } = require("strapi-utils");

module.exports = {
  async index(ctx) {
    const { sender, receiver, amount } = ctx.request.body;

    let entity;
    // deduct amount from sender
    // add amount to reciver
    // add the transaction to transact

    const senderAcc = await strapi.services.account.findOne({
      name: sender,
    });
    const receiverAcc = await strapi.services.account.findOne({
      name: receiver,
    });

    senderAcc.balance = parseFloat(senderAcc.balance) - parseFloat(amount);
    receiverAcc.balance = parseFloat(receiverAcc.balance) + parseFloat(amount);

    await strapi.services.account.update({ name: sender }, senderAcc);
    await strapi.services.account.update({ name: receiver }, receiverAcc);
    entity = await strapi.services.transact.create({
      sender,
      receiver,
      amount,
    });
    return sanitizeEntity(entity, { model: strapi.models.transact });
  },
};
