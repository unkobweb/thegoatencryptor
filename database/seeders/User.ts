import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import User from 'App/Models/User'

export default class UserSeeder extends BaseSeeder {
  public async run () {
    // Write your database queries inside the run method
    await User.createMany([
      {
        email: "sieg.alexandre@gmail.com",
        password: "Azerty49",
        invitation_code_id: 1
      }
    ])
  }
}
