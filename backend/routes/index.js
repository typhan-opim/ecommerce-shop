const express = require('express')

const router = express.Router()

const userSignUpController = require("../controller/user/userSignUp")
const userSignInController = require('../controller/user/userSignIn')
const userDetailsController = require('../controller/user/userDetails')
const authToken = require('../middleware/authToken')
const userLogout = require('../controller/user/userLogout')
const allUsers = require('../controller/user/allUsers')
const updateUser = require('../controller/user/updateUser')
const UploadProductController = require('../controller/product/uploadProduct')
const getProductController = require('../controller/product/getProduct')
const updateProductController = require('../controller/product/updateProduct')
const getCategoryProduct = require('../controller/product/getCategoryProductOne')
const getCategoryWiseProduct = require('../controller/product/getCategoryWiseProduct')
const getProductDetails = require('../controller/product/getProductDetails')
const addToCartController = require('../controller/user/addToCartController')
const countAddToCartProduct = require('../controller/user/countAddToCartProduct')
const addToCartViewProduct  = require('../controller/user/addToCartViewProduct')
const updateAddToCartProduct = require('../controller/user/updateAddToCartProduct')
const deleteAddToCartProduct = require('../controller/user/deleteAddToCartProduct')
const searchProduct = require('../controller/product/searchProduct')
const filterProductController = require('../controller/product/filterProduct')
const paymentController = require('../controller/order/paymentController')
const webhooks = require('../controller/order/webhook')
const orderController = require('../controller/order/order.controller')
const allOrderController = require('../controller/order/allOrder.controller')





// Public routes (no authToken)
router.post("/signup", userSignUpController)
router.post("/signin", userSignInController)
router.get("/userLogout", userLogout)
router.get("/get-product", getProductController)
router.get("/get-categoryProduct", getCategoryProduct)
router.post("/category-product", getCategoryWiseProduct)
router.post("/product-details", getProductDetails)
router.get("/search", searchProduct)
router.post('/filter-product', filterProductController)
router.post('/webhook', webhooks) // /api/webhook

// Auth routes (require authToken)
router.get("/auth/user-details", authToken, userDetailsController)
router.get("/auth/all-user", authToken, allUsers)
router.post("/auth/update-user", authToken, updateUser)
router.post("/auth/upload-product", authToken, UploadProductController)
router.post("/auth/update-product", authToken, updateProductController)
// user add to cart
router.post("/auth/addtocart", authToken, addToCartController)
router.get("/auth/countAddToCartProduct", authToken, countAddToCartProduct)
router.get("/auth/view-card-product", authToken, addToCartViewProduct)
router.post("/auth/update-cart-product", authToken, updateAddToCartProduct)
router.post("/auth/delete-cart-product", authToken, deleteAddToCartProduct)
// payment and order
router.post('/auth/checkout', authToken, paymentController)
router.get("/auth/order-list", authToken, orderController)
router.get("/auth/all-order", authToken, allOrderController)






module.exports = router