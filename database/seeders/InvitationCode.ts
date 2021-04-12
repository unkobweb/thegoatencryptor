import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import InvitationCode from 'App/Models/InvitationCode'

export default class InvitationCodeSeeder extends BaseSeeder {
  public async run () {
    // Write your database queries inside the run method
    function genInvitationCode(length) {
      let result = '';
      let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789/.$%:!;?';
      let charactersLength = characters.length;
      for (var i = 0; i < length; i++) {
          result += characters.charAt(Math.floor(Math.random() * charactersLength));
      }
      return result;
    }
    await InvitationCode.createMany([
      {
        code: genInvitationCode(10)
      },
      {
        code: genInvitationCode(10)
      },
      {
        code: genInvitationCode(10)
      }
    ])
  }
}
