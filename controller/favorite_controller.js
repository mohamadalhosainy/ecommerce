const { favorite } = require('../models/favorite');
const Joi = require('joi');
const knex = require('../db');
const _ = require('lodash');

exports.addFavorite = async (req , res) => {
    const productId = req.params.id ;
    const userId = req.user.id ;

    if(isNaN(productId) || productId <=0) {
        throw new Error('bad request!') ;
    }
    const newFav = {
        user_id : parseInt(userId) ,
        product_id : parseInt(productId) ,
    };
    
    const Favorite = new favorite(newFav) ;
    
    try {
        const query = await knex('Favorites').where('product_id' , productId).where('user_id',userId);
        if (query.length === 0) {
            await Favorite.save() ;
            res.status(200).send({'message' : 'The Favorite added sucessfully'}) ;
        } else {
            await knex('Favorites').where('product_id' , productId).where('user_id',userId).delete() ;
            res.status(200).send({'message' : 'The Favorite deleted sucessfully'}) ;
        }
    } catch (e) {
        console.log(e) ;
        return res.status(400).send({'message' : e}) ;
    }
}

exports.getFavoriteProduct = async (req , res) => {
    try {
        const userId = req.user.id ;
        const query = await knex('Favorites as f').select('*')
        .join('Products as p' , 'f.product_id' , 'p.id')
        .where('f.user_id',userId);
        res.status(200).send({'Favorites' : query}) ;
    } catch (e) {
        console.log(e) ;
        return res.status(400).send({'message' : e}) ;
    }
}