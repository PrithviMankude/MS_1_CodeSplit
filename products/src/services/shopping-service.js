const { ShoppingRepository } = require("../database");
const { FormatData } = require("../utils");

class ShoppingService {
  constructor() {
    this.repository = new ShoppingRepository();
  }

  async PlaceOrder(userInput) {
    const { _id, txnNumber } = userInput;
    console.log("In shopping service", _id, txnNumber);
    try {
      //verify the txn Id with payment logs
      const orderResult = await this.repository.CreateNewOrder(_id, txnNumber);
      return FormatData(orderResult);
    } catch (err) {
      throw new APIError("Data Not found", err);
    }
  }

  async GetOrders(customerId) {
    try {
      const orders = await this.repository.Orders(customerId);
      return FormatData(orders);
    } catch (err) {
      throw new APIError("Data Not found", err);
    }
  }
}

module.exports = ShoppingService;
