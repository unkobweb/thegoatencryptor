import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import Category from 'App/Models/Category';
import Challenge from 'App/Models/Challenge';
import Success from 'App/Models/Success';
import path from 'path';

export default class ChallengesController {
    async getAllChallenges({response}: HttpContextContract){
        const categories = await Category.query().preload('challenge')
        response.send(categories)
    }

    async challenge({ params, auth, view }: HttpContextContract){
        await auth.authenticate()
        const challenge = await Challenge.find(params.id)
        return view.render('challenge',{challenge})
    }

    async isAlreadyFinished({ params, auth, response }:HttpContextContract){
        const user = await auth.authenticate()
        const id = params.id
        const result = await Success.query().where('user_id',user.id).where('challenge_id',id)
        if (result.length == 0) {
            response.send({state: false})
        } else {
            response.send({state: true})
        }
    }

    async submitFlag({ request, auth, response}: HttpContextContract){
        const user = await auth.authenticate()
        const {id, flag} = request.all()
        const challenge = await Challenge.find(id)
        if (challenge?.flag !== flag){
            response.send({message: "Mauvais flag :(",type: "error"})
        } else {
            const success = await Success.create({
                user_id: user.id,
                challenge_id: challenge?.id
            })
            await success.save()
            response.send({message: "Bien joué !", type: "success"})
        }
    }

    async vpn({response}: HttpContextContract){
        response.attachment(path.resolve("./public/ovpn-thegoatencryptor-client.ovpn"),"ovpn-thegoatencryptor-client.ovpn")
    }
}
