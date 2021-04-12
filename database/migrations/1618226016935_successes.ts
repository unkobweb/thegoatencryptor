import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Successes extends BaseSchema {
  protected tableName = 'successes'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('user_id').notNullable()
      table.integer('challenge_id').notNullable()
      table.timestamps(true)
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
