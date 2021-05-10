import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import * as CLI from 'docker-cli-js';
import path from 'path';
import Docker from 'App/Models/Docker';
import { DateTime } from 'luxon';

export default class DockersController {

    async runDockerCmd(command): Promise<any>{
        return new Promise(resolve => {
            const options = new CLI.Options(
                /* machineName */ undefined,
                /* currentWorkingDirectory */ path.join(__dirname, '..', '..', '..', 'docker'),
                /* echo*/ true,
            );
              
            let docker = new CLI.Docker(options);

            docker.command(command).then(data => {
                const key = Object.keys(data)[2]
                resolve(data[key])
            })
        })
    }

    async getActualDocker({ params, auth, response }:HttpContextContract){
        const user = await auth.authenticate()
        const docker = await Docker.query().where('user_id',user.id).where('is_active',true).where('challenge_slug',params.slug)
        if (docker.length > 0){
            const container = docker[0]
            response.send({
                state: true,
                ip: container.docker_ip,
                destroyAt: container.destroy_at
            })
        } else {
            response.send({
                state: false
            })
        }
    }

    async startDocker({ params, auth, response }: HttpContextContract){
        const user = await auth.authenticate()
        const alreadyLaunched = await Docker.query().where('user_id', user.id).where('is_active',true)
        if (alreadyLaunched.length > 0){
            await this.runDockerCmd('kill '+alreadyLaunched[0].docker_id)
            
            const actualDocker = alreadyLaunched[0]
            actualDocker.is_active = false
            await actualDocker.save()
        }
        const id = await this.runDockerCmd('run -d -p 22 --rm test')        
        const ip = (await this.runDockerCmd('inspect '+id))[0].NetworkSettings.IPAddress

        const now = new Date()
        const hours = now.getHours()
        now.setHours(hours + 1)

        await Docker.create({
            user_id: user.id,
            docker_id: id,
            docker_ip: ip,
            challenge_slug: params.slug,
            destroy_at: DateTime.fromJSDate(now)
        })

        response.send({
            ip,
            destroyAt: now
        })
    }

    async killDocker({auth, response}: HttpContextContract) {
        const user = await auth.authenticate()
        const docker = await Docker.query().where('user_id',user.id).where('is_active',true)
        await this.runDockerCmd('kill '+docker[0].docker_id)
        const actualDocker = docker[0]
        actualDocker.is_active = false
        await actualDocker.save()
        response.status(200)
    }
}
