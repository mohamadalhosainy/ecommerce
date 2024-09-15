
exports.up = async  function(knex) {
    await knex.schema.createTable('Categories', (table) => {
        table.increments('id').primary();
        table.string('name').notNullable();
        table.timestamps(true, true);
    });
};

exports.down = async function(knex) {
    await knex.schema.dropTable('Categories');  
};
