import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import InvitationCode from 'App/Models/InvitationCode'
import User from 'App/Models/User'
import RegisterValidator from 'App/Validators/RegisterValidator'
import base64 from 'base-64'

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
                username: username,
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

    async logout({ auth, response }: HttpContextContract){
        await auth.authenticate()
        await auth.logout()
        response.redirect("/login")
    }

    async getInviteCode({response}: HttpContextContract) {
        function genInvitationCode(length) {
            let result = '';
            let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789/.$%:!;?';
            let charactersLength = characters.length;
            for (var i = 0; i < length; i++) {
                result += characters.charAt(Math.floor(Math.random() * charactersLength));
            }
            return result;
        }
        const lastUser = await User.query().orderBy('id','desc').limit(1)
        const lastInviteCode = await InvitationCode.query().orderBy('id','desc').limit(1)
        if (lastUser[0].invitation_code_id == lastInviteCode[0].id){
            const inviteCode = await InvitationCode.create({code: genInvitationCode(10)})
            response.send({
                type: 'success',
                encoded: true,
                code: base64.encode(inviteCode.code)
            })
        } else {
            response.send({
                type: 'success',
                encoded: true,
                code: base64.encode(lastInviteCode[0].code)
            })
        }
    }

    async oldGetInviteCode({response}: HttpContextContract){
        response.send({
            type: "error",
            message: "I PUT it somewhere else"
        })
    }
}
