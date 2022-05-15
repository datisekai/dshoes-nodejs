const express = require("express");
const argon2 = require("argon2");
const router = express.Router();
const isLogin = require("../middleware/isLogin");
const isManagerUser = require("../middleware/isManagerUser");
const isExist = require("../middleware/isExist");
const isManagerProduct = require("../middleware/isManagerProduct");
const {
  addType,
  deleteType,
  getAllType,
} = require("../Controller/TypeController");
const {
  addProduct,
  deleteProduct,
  updateProduct,
  getByIdProduct,
  getByTypeProduct,
  getAllProduct,
  filterProducts,
  getMaxProduct,
  getAllProductByAdmin,
} = require("../Controller/ProductController");
const { addSize, deleteSize } = require("../Controller/SizeController");

// them product moi
/// api/products
router.post("/", isLogin, isExist, isManagerProduct, addProduct);
router.get("/", getAllProduct);
router.get("/admin", getAllProductByAdmin);
router.get("/max", getMaxProduct);

//xoa product
// api/products/:id
router.delete("/:id", isLogin, isExist, isManagerProduct, deleteProduct);

//update product
// api/products/:id
router.put("/:id", isLogin, isExist, isManagerProduct, updateProduct);

// get product by id
// api/products/:id
router.get("/:id", getByIdProduct);
// get product by type
router.get("/type/:id", getByTypeProduct);

router.get("/types/all", getAllType);

// Them type mowis
// api/products/type
router.post("/type", isLogin, isExist, isManagerProduct, addType);

//them size moi
// api/products/size/:id
router.post("/size/:id", isLogin, isExist, isManagerProduct, addSize);

//xoa size
// api/products/size/:id
router.delete("/size/:id", isLogin, isExist, isManagerProduct, deleteSize);

//xoa type
// api/products/type/:id
router.delete("/type/:id", isLogin, isExist, isManagerProduct, deleteType);

//search
router.post("/search", filterProducts);

module.exports = router;
