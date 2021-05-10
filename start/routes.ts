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
| and then import them inside `start/routes/index.ts` as follows
|
| import './cart'
| import './customer'
|
*/

import Route from '@ioc:Adonis/Core/Route'

Route.get('/','HomeController.index')
Route.get('/login', 'AuthController.getLoginPage')
Route.get('/register', 'AuthController.getRegisterPage')
Route.post('/login', 'AuthController.login')
Route.post('/register', 'AuthController.register')
Route.get('/challenge/:id', 'ChallengesController.challenge')
Route.get('/logout', 'AuthController.logout')
Route.get('/challenges','ChallengesController.getAllChallenges')
Route.post('/submitFlag', 'ChallengesController.submitFlag')
Route.get('/isAlreadyFinished/:id', 'ChallengesController.isAlreadyFinished')
Route.get('/vpn', 'ChallengesController.vpn')
Route.get('/docker/start/:slug','DockersController.startDocker')
Route.get('/docker/getActualDocker/:slug','DockersController.getActualDocker')
Route.get('/docker/kill','DockersController.killDocker')