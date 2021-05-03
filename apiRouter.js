//imports
const usersCtrl  =require('./route/usercontroleur');
var express     = require('express');

//route 
exports.router = (function() {
  var apiRouteur = express.Router(); 

  // Users routes
  apiRouteur.route('/users/register').post(usersCtrl.register) ; //s'enregistrer
  apiRouteur.route('/users/login').post(usersCtrl.login) ; //se connecter
  apiRouteur.route('/users/verify/:phone').get(usersCtrl.verify) ; //verifier si l'email est deja utiliser
  apiRouteur.route('/users/getall').get(usersCtrl.getall) ; //recupere la liste des users 
  apiRouteur.route('/users/delall').delete(usersCtrl.delall) ; //supprime la liste des users 
  apiRouteur.route('/users/gps').put(usersCtrl.gps) ; //update user 
  apiRouteur.route('/users/stop').put(usersCtrl.stop) ; //stop user 
 
  return apiRouteur;
})();