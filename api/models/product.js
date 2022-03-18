const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: String,
    price: String,
    adress: String,
    phone: String,
    image: String,
    wifi: String,
    petFriendly: String,
    cardPayment: String,
    terrace: String
});

module.exports = mongoose.model('Product', productSchema);