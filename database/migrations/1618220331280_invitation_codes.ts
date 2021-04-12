import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class InvitationCodes extends BaseSchema {
  protected tableName = 'invitation_codes'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('code').unique().notNullable()
      table.timestamps(true)
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
