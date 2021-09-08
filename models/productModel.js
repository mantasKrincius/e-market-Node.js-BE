const mongoose = require('mongoose')

const productPost = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User',
    },
    userName: {
        type: String,
    },
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    productImage: {
        type: String
    },
    productImage2: {
        type: String
    }
}, {
    toJSON: {
        transform(doc, ret) {
            if (ret.productImage)
                ret.productImage = 'http://localhost:3000/' + ret.productImage
        }
    },
})


const Product = mongoose.model('Products', productPost)

module.exports = Product

