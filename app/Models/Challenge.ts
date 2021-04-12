import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo, BelongsTo, HasMany, hasMany } from '@ioc:Adonis/Lucid/Orm'
import Category from './Category'
import Success from './Success'

export default class Challenge extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public category_id: number

  @column()
  public slug: string

  @column()
  public label: string

  @column()
  public flag: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @belongsTo(() => Category, {
    localKey: "id",
    foreignKey: "category_id"
  })

  public category: BelongsTo<typeof Category>
  
  @hasMany(() => Success,{
    localKey: "id",
    foreignKey: "challenge_id"
  })
  public success: HasMany<typeof Success>
}