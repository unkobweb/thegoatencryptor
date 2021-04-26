import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Category from 'App/Models/Category'
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
        await auth.authenticate()
        const hallOfFame = await User.query().withCount('success').preload('success').orderBy('success_count','desc').limit(10)
        const allCategory = await Category.query().withCount('challenge').preload('challenge')
        const countAllChallenges = allCategory.reduce((accumulator, category) => accumulator + category.$extras.challenge_count,0)
        return view.render("dashboard", {hallOfFame, allCategory, countAllChallenges})
    }
}
