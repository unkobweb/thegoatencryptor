import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'

export default class HomeController {
    /**
     * Nested
     * let user = await User.find(1)
        await user?.preload('success', (query) => {
            query.preload('challenge')
        })
        console.log(user?.serialize().success[0].challenge)
     */
    async index({ view, auth }: HttpContextContract){
        console.log(await auth.authenticate())
        return view.render("main")
    }
}
