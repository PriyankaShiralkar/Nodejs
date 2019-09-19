const express = require('express');
const router = express.Router();
const InventoryModel = require('../models/inventory');
const _ = require('lodash');

router.get('/', function(req, res){
    //List all items
    let cartPrice = 0;
    
    if(req.session.cart) {
         req.session.cart.forEach(function(cartItem) {
           cartPrice = cartPrice + Number(cartItem.itemPrice);
         })
       }
    
    InventoryModel.find({})
        .then(function(items){
            res.render('inventory',{
                items: items,
                numCartItems:_.get(req,'session.cart.length', 0),
                cartPrice:cartPrice
            })
        }).then(console.log(req.session));
    
});

router.get('/add-item', function(req, res){
    res.render('add-item');
});

router.post('/add-item', function(req,res){
    const name= req.body.name;
    const description = req.body.description;
    const price = req.body.price;
    const category = req.body.category;

    const inventoryItem = new InventoryModel({
        name : name,
        description: description,
        category : category,
        price : Number(price)
        
    });
   
    inventoryItem.save()
        .then(function(){
            res.redirect('/shop');
        })
        .catch(err => console.log(err));
});

router.post('/addToCart', function(req,res){
    const itemId = req.body.itemId;
    InventoryModel.findOne({_id:itemId})
    .then(function(item){
        console.log(item);
        
        if(!req.session.cart){
            req.session.cart=[];
        }
        req.session.cart.push({
            itemName :item.name,
            itemPrice :item.price
        });
        res.redirect('/shop');
    }).catch(err => {throw err});

    
});

module.exports = router;