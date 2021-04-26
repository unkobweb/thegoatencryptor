import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Challenges extends BaseSchema {
  protected tableName = 'challenges'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('category_id').notNullable()
      table.string('slug').unique().notNullable()
      table.string('label').unique().notNullable()
      table.text('content').notNullable()
      table.string('flag').unique().notNullable()
      table.timestamps(true)
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
