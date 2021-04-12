import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo, BelongsTo } from '@ioc:Adonis/Lucid/Orm'
import User from './User'
import Challenge from './Challenge'

export default class Success extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public user_id: number
  
  @column()
  public challenge_id: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @belongsTo(() => User,{
    localKey: "id",
    foreignKey: "user_id"
  })
  public user: BelongsTo<typeof User>

  @belongsTo(() => Challenge,{
    localKey: "id",
    foreignKey: "challenge_id"
  })
  public challenge: BelongsTo<typeof Challenge>
}
