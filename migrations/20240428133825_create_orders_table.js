exports.up = async function(knex) {
  await knex.schema.createTable('Orders',(table) => {
    table.increments('id').primary();
    table.integer('user_id').unsigned().notNullable();
    table.foreign('user_id').references('Users.id');
    table.timestamps(true, true); 
  }) ;
};

exports.down = async function(knex) {
    await knex.schema.dropTable('Orders'); 
};
