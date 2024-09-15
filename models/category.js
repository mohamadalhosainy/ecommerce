const knex = require('../db');

class Category {
    constructor(data) {
        this.name = data.name;
    }

    async save() {
        return await knex('Categories').insert(this); 
    }
}

module.exports.category = Category ;
