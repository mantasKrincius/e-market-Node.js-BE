const mongoose = require('mongoose')

const cartSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User',
    },
    products: [],
    totalPrice: Number,
    createdAt: {
        type: Date,
        default: Date.now
    },
})

const Cart = mongoose.model('Cart', cartSchema)

module.exports = Cart