const express = require("express");
const argon2 = require("argon2");
const router = express.Router();
const isLogin = require("../middleware/isLogin");
const isManagerUser = require("../middleware/isManagerUser");
const isExist = require("../middleware/isExist");
const isManagerProduct = require("../middleware/isManagerProduct");
const { addType, deleteType } = require("../Controller/TypeController");
const {
  addProduct,
  deleteProduct,
  updateProduct,
  getByIdProduct,
  getByTypeProduct,
} = require("../Controller/ProductController");
const { addSize, deleteSize } = require("../Controller/SizeController");

// them product moi
/// api/products
router.post("/products", isLogin, isExist, isManagerProduct, addProduct);

//xoa product
// api/products/:id
router.delete(
  "/products/:id",
  isLogin,
  isExist,
  isManagerProduct,
  deleteProduct
);

//update product
// api/products/:id
router.put("/products/:id", isLogin, isExist, isManagerProduct, updateProduct);

// get product by id
// api/products/:id
router.get('/products/:id',getByIdProduct)
// get product by type
router.get('/products/type/:id',getByTypeProduct)

// Them type mowis
// api/products/type
router.post("/products/type", isLogin, isExist, isManagerProduct, addType);


//them size moi
// api/products/size/:id
router.post('/products/size/:id',isLogin, isExist, isManagerProduct, addSize)

//xoa size
// api/products/size/:id
router.delete('/products/size/:id',isLogin, isExist, isManagerProduct, deleteSize)

//xoa type
// api/products/type/:id
router.delete(
  "/products/type/:id",
  isLogin,
  isExist,
  isManagerProduct,
  deleteType
);

module.exports = router;
