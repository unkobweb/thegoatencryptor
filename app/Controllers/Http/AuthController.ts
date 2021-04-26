import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import InvitationCode from 'App/Models/InvitationCode'
import User from 'App/Models/User'
import RegisterValidator from 'App/Validators/RegisterValidator'

export default class AuthController {
    getRegisterPage({view}: HttpContextContract){
        return view.render("register")
    }

    getLoginPage({view}: HttpContextContract){
        return view.render("login")
    }

    async login({ request, auth, session, response }: HttpContextContract){
        const email = request.input('email')
        const password = request.input('password')
        console.log(request.all())
        try {
            await auth.attempt(email, password)
            return response.redirect("/")
        } catch (error) {
            session.flash("mail", email);
            console.log(error.code)
            if (error.code === "E_INVALID_AUTH_UID") {
              session.flash("auth.errors.uid", "Adresse mail invalide");
            }
            if (error.code === "E_INVALID_AUTH_PASSWORD") {
              session.flash("auth.errors.password", "Mot de passe invalide");
            }
            return response.redirect("/login");
        }
    }

    async register({ request, auth, session, response}: HttpContextContract){
        const {email, username, password, invitation_code} = request.all()
        console.log(request.all())
        session.flash("mail",email)
        session.flash("invitation_code", invitation_code)
        session.flash("username",username)
        try {
            await request.validate(RegisterValidator)
        } catch (error) {
            if (error.messages.email){
                session.flash("auth.errors.email",error.messages.email)
            }
            if (error.messages.password) {
                session.flash("auth.errors.password",error.messages.password)
            }
            if (error.messages.username) {
                session.flash("auth.errors.username",error.messages.username)
            }
            const invitation = await InvitationCode.findBy('code',invitation_code)
            if (!invitation || await User.findBy("invitation_code_id",invitation.id)){
                session.flash("auth.errors.invitation_code","Ce code d'invitation n'existe pas ou a déjà été utilisé")
            }

            return response.redirect("/register")
        }
        const invitation = await InvitationCode.findBy('code',invitation_code)
        if (invitation && !(await User.findBy("invitation_code_id",invitation.id))){
            let user = await User.create({
                email: email,
                password: password,
                invitation_code_id: invitation.id
            })
            await user.save()
            await auth.login(user)
            return response.redirect("/")
        } else {
            session.flash("auth.errors.invitation_code","Ce code d'invitation n'existe pas ou a déjà été utilisé")
            return response.redirect("/register")
        }
    }

    async logout({ auth, response }){
        await auth.authenticate()
        await auth.logout()
        response.redirect("/login")
    }
}
