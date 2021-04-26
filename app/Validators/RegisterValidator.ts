import { schema, rules } from '@ioc:Adonis/Core/Validator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class RegisterValidator {
  constructor (protected ctx: HttpContextContract) {
  }

  public schema = schema.create({
	  email: schema.string({ trim: true }, [
		  rules.email(),
		  rules.unique({table: "users", column: "email"})
	  ]),
	  username: schema.string({ trim: true }, [
		  rules.unique({table: "users", column: "username"})
	  ]),
	  password: schema.string({ trim: true }, [
		  rules.confirmed(),
		  rules.minLength(8)
	  ])
  })

  public cacheKey = this.ctx.routeKey;

  public messages = {
	  "email.required": "L'adresse mail est requise",
	  "email.unique": "L'adresse mail est déjà utilisée",
	  "email.email": "L'adresse mail doit être valide",
	  "username.required": "Vous devez renseigner un nom d'utilisateur",
	  "username.unique": "Ce nom d'utilisateur est déjà utilisé",
	  "password.required": "Vous devez renseigner un mot de passe",
	  "password.minLength": "Le mot de passe doit faire minimum 8 caractères",
	  "password_confirmation.confirmed": "Les deux mots de passes doivent être identiques"
  }
}
