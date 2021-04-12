import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Success from 'App/Models/Success'

export default class SuccessSeeder extends BaseSeeder {
  public async run () {
    // Write your database queries inside the run method
    Success.createMany([
      {
        user_id: 1,
        challenge_id: 1
      }
    ])
  }
}
