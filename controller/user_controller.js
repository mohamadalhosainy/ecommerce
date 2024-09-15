const { user } = require('../models/user');
const Joi = require('joi');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken') ;
const knex = require('../db');
const _ = require('lodash');

exports.registercontroller = async (req, res) =>{
    const scheme = Joi.object({
        name : Joi.string().min(4).required(),
        address : Joi.string().min(4).required() ,
        phoneNumber : Joi.string().min(4).max(15).required() ,
        email : Joi.string().min(4).required().email() ,
        role : Joi.string().valid('admin' , 'user'),
        password : Joi.string().min(4).required() ,
        password_confirmation: Joi.ref('password')
    }) ;
    const newUser = req.body ;

    const { error } =  scheme.validate(newUser) ;
    if (error) return res.status(400).send({'message' : error.details[0].message}) ;

    const salt = await bcrypt.genSalt(10);
    newUser.password = await bcrypt.hash(newUser.password , salt);

    const User = new user(newUser) ;

    try {
        const query =  await User.save() ;
        const token = jwt.sign({id : query[0], role : User.role} , 'MySecuruKey' );
        res.status(200).header('token' , token).send({'message' : "Register Successfully" , 'token' : token}) ;
      } catch (error) {
        if (error.code === 'ER_DUP_ENTRY') {
          console.log(error) ;
          return res.status(400).send({'message' : 'Email already exists'}) ;
        }
        
        throw error; 
      }
}

exports.logincontroller = async (req , res) => {
    const scheme = Joi.object({
        email : Joi.string().min(4).required().email() ,
        password : Joi.string().min(4).required() 
    }) ;
    const user = req.body ;

    const { error } =  scheme.validate(user) ;
    if (error) return res.status(400).send({'message' : error.details[0].message}) ;

    try {
      const query = await knex('Users').where('email' , user.email).first() ;

      if (!query) return res.status(400).send({'message' : 'the email or the password is wrong'}) ;

      const password = await bcrypt.compare(user.password,query.password) ;
      if (!password) return res.status(400).send({'message' : 'the email or the password is wrong'}) ;

      const token = jwt.sign({id : query.id, role : query.role} , 'MySecuruKey' );
      res.status(200).header('token' , token).send({'user' : _.omit(query,['password']) , 'token' : token}) ;
    } catch (e) {
      res.status(500).json({ message: 'Internal server error' });
    }
}

exports.logoutcontroller = async (req , res) => {
  res.status(200).send({'message' : 'logout successfully'}) ;
}

