
exports.up =async function(knex) {
    await knex.schema.createTable('Products', (table) => {
        table.increments('id').primary();
        table.string('name').notNullable();
        table.integer('price').notNullable();
        table.string('description').notNullable();
        table.string('brand').notNullable();
        table.integer('quantity').unsigned().notNullable();
        table.string('photo');
        table.integer('category_id').unsigned().notNullable();
        table.foreign('category_id').references('Categories.id');
        table.timestamps(true, true); 
    });
};


exports.down =async function(knex) {
    await knex.schema.dropTable('Products');   
};
