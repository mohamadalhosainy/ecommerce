const knex = require('../db');

class Order {
    constructor(userId) {
        this.user_id = userId ;
    }

    async save() {
        return await knex('Orders').insert(this); 
    }
}

module.exports.order = Order ;
