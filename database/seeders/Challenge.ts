import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Challenge from 'App/Models/Challenge'

export default class ChallengeSeeder extends BaseSeeder {
  public async run () {
    // Write your database queries inside the run method
    await Challenge.createMany([
      {
        category_id: 1,
        slug: "sql-injection",
        label: "Injection SQL",
        flag: "sqlvaccin"
      },
      {
        category_id: 1,
        slug: "xxs",
        label: "Faille XSS",
        flag: "promptmyscript"
      },
      {
        category_id: 2,
        slug: "weak-ssh",
        label: "SSH fébrile",
        flag: "ilovemovies"
      }
    ])
  }
}
