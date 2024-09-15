exports.up = async function(knex) {
    await knex.schema.createTable('OrderItems',(table) => {
      table.increments('id').primary();
      table.integer('quantity').unsigned().notNullable();
      table.integer('product_id').unsigned().notNullable();
      table.foreign('product_id').references('Products.id');
      table.integer('order_id').unsigned().notNullable();
      table.foreign('order_id').references('Orders.id');
      table.timestamps(true, true); 
    }) ;
  };
  
  exports.down = async function(knex) {
      await knex.schema.dropTable('OrderItems'); 
  };
  