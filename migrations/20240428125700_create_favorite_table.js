exports.up = async  function(knex) {
    await knex.schema.createTable('Favorites', (table) => {
        table.increments('id').primary();
        table.integer('product_id').unsigned().notNullable();
        table.foreign('product_id').references('Products.id');
        table.integer('user_id').unsigned().notNullable();
        table.foreign('user_id').references('Users.id');
        table.timestamps(true, true); 
    });
};

exports.down = async function(knex) {
    await knex.schema.dropTable('Favorites'); 
};
