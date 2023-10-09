const ShoppingService = require("../services/shopping-service");
const UserService = require("../services/customer-service");
const UserAuth = require("./middlewares/auth");

module.exports = (app) => {
  const service = new ShoppingService();
  const userService = new UserService();

  app.post("/shopping/order", UserAuth, async (req, res, next) => {
    const { _id } = req.user;
    const { txnNumber } = req.body;
    console.log("Data:", _id, txnNumber);
    try {
      const { data } = await service.PlaceOrder({ _id, txnNumber });
      console.log("Create Order: ", data);
      return res.status(200).json(data);
    } catch (error) {
      next(error);
    }
  });

  app.get("/shopping/orders", UserAuth, async (req, res, next) => {
    const { _id } = req.user;

    try {
      const { data } = await userService.GetShoppingDetails(_id);
      console.log("Shopping details", data);
      return res.status(200).json(data.orders);
    } catch (error) {
      next(error);
    }
  });

  app.get("/shopping/cart", UserAuth, async (req, res, next) => {
    const { _id } = req.user;
    try {
      const { data } = await userService.GetShoppingDetails(_id);
      console.log("Shopping cart details", data);
      return res.status(200).json(data.cart);
    } catch (err) {
      next(err);
    }
  });
};
