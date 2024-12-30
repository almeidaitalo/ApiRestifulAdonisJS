import { v4 as uuidv4 } from 'uuid'

import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

//Fazer as manipulações de banco de dados
import Moment from 'App/Models/Moment'

import Application from '@ioc:Adonis/Core/Application'

export default class MomentsController {
    
    private validationOptions = {
        types: ['image'],
        size: "2mb"
    }
    //Funcão: inserção de dados no sistema
    public async store({request, response}: HttpContextContract){
       
        const body = request.body()
        
        //Fazer upload de imagens
        const image = request.file('image', this.validationOptions )

        if(image){
            const imageName = `${uuidv4()}.${image.extname}`

            await image.move(Application.tmpPath('uploads'), {
                name: imageName
            })

            body.image = imageName
        }

        //Fazer o inserte no banco de dados
        const moment = await Moment.create(body)

        response.status(201)

        return {
          message: "Momento criadom com sucesso!",
          datas: moment,
        }
    }
    //Listar todos os momentos
     public async index() {
        const moments = await Moment.query().preload('comments')
        
        return{
             
            data: moments,
        }
        
    }
    //Buscar por Id
    public async show({params}: HttpContextContract){

        const moment = await Moment.findOrFail(params.id) 

        await moment.load('comments')
        
        return {
            data: moment, 
        }

    }
    //Delete
    public async destroy({params}: HttpContextContract ) {
        
        const moment = await Moment.findOrFail(params.id) 
        
        await moment.delete()

        return {
            message: "Momento excluido com sucesso!",
            data: moment, 
        }
        }
        //Update
        public async update({params, request}: HttpContextContract){
    
         
         const body = request.body() 

         const moment = await Moment.findOrFail(params.id) 
         
         moment.title = body.title
         moment.description = body.description

         if(moment.image != body.image || !moment.image ){
            const image = request.file('image', this.validationOptions )
            if(image){
                const imageName = `${uuidv4()}.${image.extname}`

            await image.move(Application.tmpPath('uploads'), {
                name: imageName
            })

            moment.image = imageName
            }
            await moment.save()

            return {
                message: "Momento atualizar com sucesso!",
                data: moment,
            }
            
        }
        
    }
    
 }

