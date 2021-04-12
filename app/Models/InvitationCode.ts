import { DateTime } from 'luxon'
import { BaseModel, column, hasOne, HasOne } from '@ioc:Adonis/Lucid/Orm'
import User from './User'

export default class InvitationCode extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public code: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @hasOne(() => User,{
    localKey: "id",
    foreignKey: "invitation_code_id"
  })
  public user: HasOne<typeof User>
}
