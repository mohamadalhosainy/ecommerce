const knex = require('../db');

class User {
    constructor(data) {
        this.name = data.name;
        this.email = data.email;
        this.password = data.password; 
        this.phoneNumber = data.phoneNumber ; 
        this.address = data.address;
        this.role = data.role ;
    }

    async save() {
        return await knex('Users').insert(this); 
    }
}

module.exports.user = User ;
