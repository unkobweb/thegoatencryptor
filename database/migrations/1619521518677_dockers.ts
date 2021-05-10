import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Dockers extends BaseSchema {
  protected tableName = 'dockers'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('user_id').notNullable()
      table.string('docker_id').notNullable()
      table.string('docker_ip').notNullable()
      table.string('challenge_slug').notNullable()
      table.timestamp('destroy_at').notNullable()
      table.boolean('is_active').notNullable().defaultTo(true)
      table.timestamps(true)
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
