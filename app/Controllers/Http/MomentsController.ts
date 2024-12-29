import { v4 as uuidv4 } from 'uuid'

import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

//fazer as manipulações de banco de dados
import Moment from 'App/Models/Moment'

import Application from '@ioc:Adonis/Core/Application'

export default class MomentsController {
    
    private validationOptions = {
        types: ['image'],
        size: "2mb"
    }
    //Funcão: inscessão de dados no sistema
    public async store({request, response}: HttpContextContract){
       
        const body = request.body()
        
        const image = request.file('image', this.validationOptions )

        if(image){
            const imageName = `${uuidv4()}.${image.extname}`

            await image.move(Application.tmpPath('uploads'), {
                name: imageName
            })

            body.image = imageName
        }

        //fazer o inserte no banco de dados
        const moment = await Moment.create(body)

        response.status(201)

        return {
          message: "Momento criadom com sucesso!",
          datas: moment,
        }
    }
     public async index() {
        const moments = await Moment.all()

        return{
             
            data: moments,
        
        }
        
    }
}
