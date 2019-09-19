'use strict';

const mongoose = require('mongoose');

const InventorySchema = new mongoose.Schema({
    name: String,
    description: String,
    category:String,
    subCategory:String,
    price:Number
});

const InventoryModel = mongoose.model('inventory', InventorySchema);

module.exports = InventoryModel;