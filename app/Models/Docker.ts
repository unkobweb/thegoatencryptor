import { DateTime } from 'luxon'
import { BaseModel, belongsTo, BelongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import User from './User'

export default class Docker extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public user_id: number

  @column()
  public docker_id: string

  @column()
  public docker_ip: string

  @column()
  public challenge_slug: string

  @column.dateTime()
  public destroy_at: DateTime

  @column()
  public is_active: boolean

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @belongsTo(() => User,{
    localKey: "id",
    foreignKey: "user_id"
  })
  public user: BelongsTo<typeof User>
}
