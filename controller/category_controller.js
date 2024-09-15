const { category } = require('../models/category');
const Joi = require('joi');
const knex = require('../db');
const _ = require('lodash');

exports.makeCategory = async (req , res) => {
    const schema = Joi.object({
        name : Joi.string().min(3).required() 
    }) ;
    const newCategory = req.body ;

    const { error } = schema.validate(newCategory) ;
        if (error) return res.status(400).send({'message' : error.details[0].message}) ;

    const Category = new category(newCategory) ;

    try {
        await Category.save() ;
        res.status(200).send({'message' : 'The Category created sucessfully'}) ;
    } catch (e) {
        console.log(e) ;
        return res.status(400).send({'message' : e}) ;
    }
}

exports.getCategory = async (req , res) => {
    try {
        const category = await knex('Categories').select('*').orderBy('id', 'asc');
        res.status(200).send({'Categories' : category}) ;
    } catch (e) {
        console.log(e) ;
        return res.status(400).send({'message' : e}) ;
    }
}

exports.deleteCategory = async (req,res) => {
    try{
        const id = req.params.id ;
        if(isNaN(id) || id <=0) {
            throw new Error('bad request!') ;
        }
        const result = await knex('Categories').where('id' , id).delete();
        if (result === 0){
            res.status(400).send({'message' : 'The Category not found '}) ;
            return ;
        }
        res.status(200).send({'message' : 'The Category deleted sucessfully'}) ;
    }catch(e){
        return res.status(400).send({'message' : e.message}) ;
    }
}

exports.updateCategory = async (req , res) => {
    const schema = Joi.object({
        name : Joi.string().min(3)
    }) ;
    const updateCategory = req.body ;

    const { error } = schema.validate(updateCategory) ;
    if (error) return res.status(400).send({'message' : error.details[0].message}) ;

    try{
        const id = req.params.id ;
        if(isNaN(id) || id <=0) {
            throw new Error('bad request!') ;
        }
        const result = await knex('Categories').where('id' , id).update(updateCategory);
        if (result === 0){
            res.status(400).send({'message' : 'The Category not found '}) ;
            return ;
        }
        res.status(200).send({'message' : 'The Category updated sucessfully'}) ;
    }catch(e){
        return res.status(400).send({'message' : e.message}) ;
    }
}