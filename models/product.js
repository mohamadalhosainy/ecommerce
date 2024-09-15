const knex = require('../db');

class Product {
    constructor(data) {
        this.name = data.name;
        this.price = data.price;
        this.description = data.description; 
        this.brand = data.brand ; 
        this.quantity = data.quantity;
        this.photo = data.photo;
        this.category_id = data.category_id ;
    }

    async save() {
        return await knex('Products').insert(this); 
    }
}

module.exports.product = Product ;
