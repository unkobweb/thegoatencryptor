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
        flag: "sqlvaccin",
        content: "Bonjour ceci est un content, c'est quand même bien foutu non ?"
      },
      {
        category_id: 1,
        slug: "xxs",
        label: "Faille XSS",
        flag: "promptmyscript",
        content: "Vous cherchez un développeur de talent ? ça tombe bien je cherche une alternance"
      },
      {
        category_id: 2,
        slug: "weak-ssh",
        label: "SSH fébrile",
        flag: "ilovemovies",
        content: "The battery of the Tesla is more important than chauffer la pièce where travail l'alternant"
      }
    ])
  }
}
