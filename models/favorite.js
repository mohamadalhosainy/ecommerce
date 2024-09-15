const knex = require('../db');

class Favorite {
    constructor(data) {
        this.user_id = data.user_id;
        this.product_id = data.product_id ;
    }

    async save() {
        return await knex('Favorites').insert(this); 
    }
}

module.exports.favorite = Favorite ;
