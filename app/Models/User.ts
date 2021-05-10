import Hash from '@ioc:Adonis/Core/Hash'
import { DateTime } from 'luxon'
import { BaseModel, column, beforeSave, belongsTo, BelongsTo, hasMany, HasMany } from '@ioc:Adonis/Lucid/Orm'
import InvitationCode from './InvitationCode'
import Success from './Success'
import Docker from './Docker'

export default class User extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public email: string

  @column()
  public username: string

  @column()
  public password: string

  @column()
  public invitation_code_id: number

  @column()
  public remember_me_token: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @belongsTo(() => InvitationCode,{
    localKey: "id",
    foreignKey: "invitation_code_id"
  })
  public invitationCode: BelongsTo<typeof InvitationCode>

  @hasMany(() => Success,{
    localKey: "id",
    foreignKey: "user_id"
  })
  public success: HasMany<typeof Success>

  @hasMany(() => Docker,{
    localKey: "id",
    foreignKey: "user_id"
  })
  public dockers: HasMany<typeof Docker>

  @beforeSave()
  public static async hashPassword(user: User) {
    if (user.$dirty.password) {
      user.password = await Hash.make(user.password);
    }
  }
}
