import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

//fazer as manipulações de banco de dados
import Moment from 'App/Models/Moment'

export default class MomentsController {

    //Funcão: inscessão de dados no sistema
    public async store({request, response}: HttpContextContract){
       
        const body = request.body()
        
        //fazer o inserte no banco de dados
        const moment = await Moment.create(body)

        response.status(201)

        return {
          message: "Momento criadom com sucesso!",
          datas: moment,
        }
    }
}
