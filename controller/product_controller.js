const { product } = require('../models/product');
const Joi = require('joi');
const knex = require('../db');
const _ = require('lodash');
const multer = require('multer');
const upload = multer({ dest: 'public/images/' });

exports.addProduct = async (req , res) => {
    const schema = Joi.object({
        name : Joi.string().min(3).required() ,
        price : Joi.number().min(3).required(),
        description : Joi.string().min(3).required(),
        brand : Joi.string().min(3).required(),
        quantity : Joi.number().min(3).required(),
        photo : Joi.string().valid('image/jpg', 'image/png'),
    });

    const { filename, path } = req.file;
    const newProduct = req.body ;

    const { error } = schema.validate(newProduct) ;
    if (error) return res.status(400).send({'message' : error.details[0].message}) ;

    newProduct.category_id = parseInt(req.params.id);
    newProduct.photo = filename;

    const Product = new product(newProduct) ;

    try {
        await Product.save() ;
        res.status(200).send({'message' : 'The Product created sucessfully'}) ;
    } catch (e) {
        if ('ER_NO_REFERENCED_ROW_2' === e.code) {
            return res.status(400).send({'message' : 'the category id is wrong'}) ;
        }
        return res.status(400).send({'message' : e}) ;
    }
}

exports.getProductByCategory = async (req , res) => {
    try {
        const id = req.params.id ;
        if(isNaN(id) || id <=0) {
            throw new Error('bad request!') ;
        }
        const product = await knex('Products').where('category_id' , id) ;
        res.status(200).send({'Products' : product}) ;
    } catch (e) {
        return res.status(200).send({'message' : e.message}) ;
    }
} 

exports.getAllProduct = async (req , res) => {
    try {
        const product = await knex('Products').select('*').orderBy('id' , 'asc') ;
        res.status(200).send({'Products' : product}) ;
    } catch (e) {
        return res.status(200).send({'message' : e.message}) ;
    }
} 

exports.getProductByID = async (req , res) => {
    try {
        const id = req.params.id ;
        if(isNaN(id) || id <=0) {
            throw new Error('bad request!') ;
        }
        const product = await knex('Products').where('id' , req.params.id);
        res.status(200).send({'Product' : product}) ;
    } catch (e) {
        return res.status(200).send({'message' : e.message}) ;
    }
} 

exports.deleteProduct = async (req,res) => {
    try{
        const id = req.params.id ;
        if(isNaN(id) || id <=0) {
            throw new Error('bad request!') ;
        }
        const result = await knex('Products').where('id' , id).delete();
        if (result === 0){
            res.status(400).send({'message' : 'The Product not found '}) ;
            return ;
        }
        res.status(200).send({'message' : 'The Product deleted sucessfully'}) ;
    }catch(e){
        return res.status(400).send({'message' : e.message}) ;
    }
}

exports.updateProduct = async (req , res) => {
    const schema = Joi.object({
        name : Joi.string().min(3) ,
        price : Joi.number().min(3),
        description : Joi.string().min(3),
        brand : Joi.string().min(3),
        quantity : Joi.number().min(3),
    }) ;
    const updateProduct = req.body ;

    const { error } = schema.validate(updateProduct) ;
    if (error) return res.status(400).send({'message' : error.details[0].message}) ;

    try{
        const id = req.params.id ;
        if(isNaN(id) || id <=0) {
            throw new Error('bad request!') ;
        }
        const result = await knex('Products').where('id' , id).update(updateProduct);
        if (result === 0){
            res.status(400).send({'message' : 'The Products not found '}) ;
            return ;
        }
        res.status(200).send({'message' : 'The Products updated sucessfully'}) ;
    }catch(e){
        return res.status(400).send({'message' : e.message}) ;
    }
}