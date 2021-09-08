const Product = require("../models/productModel");

const getAllProducts = async (req, res) => {
    let allCars = await Product.find().populate("userId"); /*if ill leave this end it will show and ALL info bout user too*/
    res.send(allCars);
};

const createPost = async (req, res) => {
    try {
        const relPath = req.file.path.replace(/\\/g, "/");
        const product = new Product({
            userId: req.user._id,
            userName: req.body.userName,
            description: req.body.description,
            price: req.body.price,
            name: req.body.name,
            quantity: req.body.quantity,
            productImage: relPath,
        });

        let saveProduct = await product.save();
        res.send(saveProduct);
        console.log(saveProduct);
    } catch (e) {
        console.log(e);
        res.status(400).send(e);
    }
};


const getMyProductsPosts = async (req, res) => {
    let productPosts = await Product.find({ userId: req.user._id });
    res.send(productPosts);
};

const deleteProductPost = async (req, res) => {
    try {
        let products = await Product.findByIdAndDelete({ _id: req.body.id });
        res.send(products);
    } catch (e) {
        console.log(e);
        res.send(e);
    }
};

const editProductInfo = async (req, res) => {
    try {
        // const relPath = req.file.path.replace(/\\/g, "/");
        let users = await Product.findOneAndUpdate(
            { _id: req.body._id },
            {
                userId: req.user._id,
                description: req.body.description,
                price: req.body.price,
                name: req.body.name,
                quantity: req.body.quantity,
                // productImage: relPath,
            },
        );
        res.send(users);
    } catch (e) {
        console.log(e);
        res.send(e);
    }
};

const getPostById = async (req, res) => {
    let product = await Product.find({ _id: await req.body.id });
    res.send(product);
};

const changeQuantity = async (req, res) => {
    try {
        let product = await Product.findOneAndUpdate(
            { _id: req.body._id },
            {
                quantity: req.body.quantity,
            },
        );
        res.send(product);
    } catch (e) {
        console.log(e);
        res.send(e);
    }
};

module.exports = {
    getAllProducts,
    createPost,
    getPostById,
    getMyProductsPosts,
    deleteProductPost,
    editProductInfo,
    changeQuantity
    // searchCars,
};
