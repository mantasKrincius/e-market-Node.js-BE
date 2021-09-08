const router = require('express').Router();
const multer = require('multer')

const userController = require("../controllers/userController");
const productController = require("../controllers/productContoller");
const authenticateMiddleware = require("../middleware/authenticate");
const cartController = require("../controllers/cartController")

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads");
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + "-" + file.originalname);
    },
});

const upload = multer({
    storage,
});

const {
    checkApi,
    postApi,
} = require('../controllers/apiCheckController')


router.route('/apiCheck')
    .get(checkApi)
    .post(postApi)



router
    .route("/user/cart")
    .get(authenticateMiddleware.authenticate, productController.getMyProductsPosts)
    .post(authenticateMiddleware.authenticate, cartController.createCart);

router.route("/products/quantity").post(authenticateMiddleware.authenticate, productController.changeQuantity)

router.route("/products").get(productController.getAllProducts);
router.route("/products/single").post(authenticateMiddleware.authenticate, productController.getPostById);
router
    .route("/products/myPosts")
    .get(authenticateMiddleware.authenticate, productController.getMyProductsPosts)
    .post(authenticateMiddleware.authenticate, upload.single("productImage"), productController.createPost);

router.route("/products/myPosts").post(authenticateMiddleware.authenticate, productController.createPost);
router
    .route("/products/editProduct")
    .post(authenticateMiddleware.authenticate, upload.single("updateProductImage"), productController.editProductInfo);
router.route("/products/delete").delete(authenticateMiddleware.authenticate, productController.deleteProductPost);
// router.route("/cars/searchCar").get(carController.searchCars);


router.route("/products/orders").get(authenticateMiddleware.authenticate, cartController.getMyOrders)



router.route("/user/signUp").post(userController.signUp);
router.route("/user/signIn").post(userController.signIn);
router.route("/user/currentUser").get(authenticateMiddleware.authenticate, userController.currentUser);
router.route("/user/logOut").post(authenticateMiddleware.authenticate, userController.logOut);

module.exports = router