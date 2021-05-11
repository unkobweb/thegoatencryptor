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
        content: `Salut,

Cette fois ci j'ai besoin de toi pour faire tomber une entreprise qui est soupçonnée de mauvais traitement sur ses employés. 
        
Il me faudrait un accès à leur serveur pour pouvoir pirater leurs caméras et récolter des preuves.
        
J'ai vu sur linkedin qu'ils avaient récemment recruté un stagiaire dans leur pôle web, peut être qu'avec le stress celui-ci à fait des erreurs essaye de voir si tu peux me récupérer un mot de passe administrateur, pour le reste, je me débrouillerai.
        
rA9`
      },
      {
        category_id: 1,
        slug: "xxs",
        label: "Faille XSS",
        flag: "promptmyscript",
        content: `Salut,

On a repéré un petit con qui fait du phishing à tout vas pour pirater le compte Facebook de certaines personnes contre un peu de cryptomonnaies.
        
Ce mec est tellement amoureux de lui même qu'il a une page avis sur son petit site et je suis sur qu'il sera dessus en moins de 10 secondes si tu poste un truc dessus.
        
Je pense que ce gars ne connais que le phishing et qu'il voit pas plus loin que le bout de son nez, essaye de voir si tu peux récupérer son cookie administrateur.
        
Ça nous permettra de deface son site, ça lui fera une petite frayeur et j'espère que ça le calmera.
Je sais que t'en est capable.
        
rA9`
      },
      {
        category_id: 2,
        slug: "weak-ssh",
        label: "SSH fébrile",
        flag: "ilovemovies",
        content: `Hey, nous avons encore besoin de toi !

Nous avons un de nos clients qui a perdu le mot de passe de son serveur privé !
Malheureusement, le nouveau arrivant chez eux n'a pas bien suivis la procédure et à mal écrit le mot de passe...

Connaissant ton talent en intrusion, on pense que tu pourrais arriver à récupérer le mot de passe SSH qu'a mit le stagiaire.

Le nom de son user est 'stagiaire' (plutôt logique quand on y pense).

Bob`
      }
    ])
  }
}
