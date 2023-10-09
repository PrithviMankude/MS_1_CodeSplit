const { CustomerModel, ProductModel, OrderModel } = require("../models");
const { v4: uuidv4 } = require("uuid");
const { APIError, BadRequestError } = require("../../utils/app-errors");

class ShoppingRepository {
  async Orders(customerId) {
    try {
      const orders = await OrderModel.find({ customerId }).populate(
        "items.product"
      );
      return orders;
    } catch (error) {
      throw APIError(
        "API Error",
        STATUS_CODES.INTERNAL_ERROR,
        "Unable to Find Orders"
      );
    }
  }

  async CreateNewOrder(customerId, txnId) {
    try {
      const profile = await CustomerModel.findById(customerId).populate(
        "cart.product"
      );

      console.log("Profile:", profile);
      if (profile) {
        let amount = 0;
        let cartItems = profile.cart;

        //Cart is not empty,
        if (cartItems.length > 0) {
          cartItems.map((item) => {
            amount += parseInt(item.product.price) * parseInt(item.unit);
          });

          //generate random OrerId
          const orderId = uuidv4();

          const order = new OrderModel({
            orderId,
            customerId,
            amount,
            txnId,
            status: "received",
            items: cartItems,
          });

          profile.cart = [];

          //order.populate("items.product").execPopulae();

          await order.populate("items.product");
          console.log("After execPopulate.. Imp");

          const orderResult = await order.save();

          profile.orders.push(orderResult);
          await profile.save();
          return orderResult;
        }
      }
      //If no items
      return {};
    } catch (error) {
      throw APIError(
        "API Error",
        STATUS_CODES.INTERNAL_ERROR,
        "Unable to Find Category"
      );
    }
  }
}

module.exports = ShoppingRepository;
