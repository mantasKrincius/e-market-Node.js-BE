//sukurti vezimeli
//prekes idejimas
//prekes isemimas
//quantity -+
//buy

const Cart = require("../models/cartModel")

const getMyOrders = async (req, res) => {
    let userOrder = await Cart.find({userId: req.user._id});
    res.send(userOrder);
    console.log(userOrder)
};


const createCart = async (req, res) => {
    const userId = req.body.userId;
    const products = req.body.products;
    const totalPrice = req.body.totalPrice
    const userCart = new Cart({
        userId,
        products,
        totalPrice
    });

    userCart.save()
        .catch(err => res.status(400).json('Error: ' + err));
};


module.exports = {
    createCart,
    getMyOrders
}
