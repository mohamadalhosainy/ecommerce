exports.up = async (knex) => {
    await knex.schema.createTable('Users', (table) => {
        table.increments('id').primary();
        table.string('name').notNullable();
        table.string('email').notNullable().unique();
        table.string('address').notNullable();
        table.string('phoneNumber').notNullable();
        table.string('password').notNullable();
        table.enu('role' , ['admin' , 'user']).defaultTo('user').notNullable() ; 
        table.timestamps(true, true);
    });
};
  
exports.down = async (knex) => {
    await knex.schema.dropTable('users');   
};