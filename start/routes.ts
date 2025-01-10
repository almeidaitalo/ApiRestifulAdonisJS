/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer'
|
*/

import Application from '@ioc:Adonis/Core/Application';


import Route from '@ioc:Adonis/Core/Route'

Route.group(() =>{
  Route.get('/', async () => {
    return { hello: 'world' }
  })
  //Resource irá mostrar todas as rotas, já o store mostra só uma 
  Route.resource("/moments", "MomentsController").apiOnly() //irá trazer apenas rotas de api
  
  Route.post("/moments/:momentId/comments", "CommentsController.store")
  Route.get("/moments/:momentId/comments", "CommentsController.index") 
  
}).prefix('/api') 


Route.get('/api/uploads/*', async ({ params, response }) => {
  // Concatena os segmentos do caminho para formar a string correta
  const filePath = Application.tmpPath('uploads', ...params['*']);
  
  try {
    // Retorna o arquivo solicitado
    return response.download(filePath);
  } catch (error) {
    console.error('Erro ao tentar acessar o arquivo:', error.message);
    return response.status(404).send({ error: 'Arquivo não encontrado' });
  }
});