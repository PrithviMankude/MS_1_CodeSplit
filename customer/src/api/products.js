//const { ProductService } = require("../services/product-service");
const CustomerService = require("../services/customer-service");
const UserAuth = require("./middlewares/auth");
const { customer } = require(".");
const ProductService = require("../services/product-service");

module.exports = (app) => {
  console.log("Prithvi: In products API ");
  const service = new ProductService();
  const customerService = new CustomerService();

  app.post("/product/create", async (req, res, next) => {
    console.log("In create/product");
    try {
      const { name, desc, type, unit, price, available, suplier, banner } =
        req.body;

      const { data } = await service.CreateProduct({
        name,
        desc,
        type,
        unit,
        price,
        available,
        suplier,
        banner,
      });

      return res.json(data);
    } catch (err) {
      next(err);
    }
  });

  app.get("/category/:type", async (req, res, next) => {
    const type = req.params.type;

    console.log("Prithvi" + type);

    try {
      const { data } = await service.GetProductsByCategory(type);

      return res.json(data);
    } catch (err) {
      next(err);
    }
  });

  app.get("/:id", async (req, res, next) => {
    const productId = req.params.id;
    try {
      const { data } = await service.GetProductDescription(productId);
      return res.status(200).json(data);
    } catch (err) {
      next(err);
    }
  });

  //Prithvi: It should be GET
  app.post("/ids", async (req, res, next) => {
    try {
      const { ids } = req.body;

      const products = await service.GetSelectedProducts(ids);
      return res.status(200).json(products);
    } catch (err) {
      next(err);
    }
  });

  app.put("/wishlist", UserAuth, async (req, res, next) => {
    const { _id } = req.user;

    console.log("User: and Product ", _id, req.body._id);
    try {
      const product = await service.GetProductById(req.body._id);
      console.log("Product :", product);
      const wishlist = await customerService.AddToWishlist(_id, product);

      return res.json(wishlist);
    } catch (err) {
      next(err);
    }
  });

  //Prithvi: Update to delete
  app.delete("/wishlist/:id", UserAuth, async (req, res, next) => {
    const { _id } = req.user;
    const productId = req.params.id;
    try {
      const product = await service.GetProductById(productId);
      const wishlist = await customerService.AddToWishlist(_id, product);

      res.status(200).json(wishlist);
    } catch (err) {
      next(err);
    }
  });

  app.put("/cart", UserAuth, async (req, res, next) => {
    const { _id, qty } = req.body;

    try {
      const product = await service.GetProductById(_id);

      console.log("PRITHVI: PRODUCT: ", product);

      console.log("Before entering customer service for manage cart");

      const result = await customerService.ManageCart(
        req.user._id,
        product,
        qty,
        false
      );

      return res.status(200).json(result);
    } catch (err) {
      next(err);
    }
  });

  app.delete("/cart/:id", UserAuth, async (req, res, next) => {
    const { _id } = req.user;
    try {
      const product = await service.GetProductById(req.params.id);
      const result = await customerService.ManageCart(_id, product, 0, true);
      res.status(200).json(result);
    } catch (err) {
      next(err);
    }
  });

  //base
  app.get("/", async (req, res, next) => {
    try {
      const { data } = await service.GetProducts();

      return res.json(data);
    } catch (err) {
      next(err);
    }
  });
};
