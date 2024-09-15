const knex = require('../db');

class OrderItem {
    constructor(data) {
        this.quantity = data.quantity;
        this.product_id = data.product_id;
        this.order_id = data.order_id ;
    }
    
    async save() {
        return await knex('OrderItems').insert(this); 
    }
}

module.exports.orderItem = OrderItem ;