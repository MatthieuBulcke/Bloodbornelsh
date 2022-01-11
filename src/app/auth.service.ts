import { Injectable } from '@angular/core';
import { ChangeTextService } from './change-text.service';
import { User } from './model/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private service:ChangeTextService) { }
  users:any;
  DBUsers = this.service.LoadUsers().subscribe( (users:any) =>{this.users = users;this.userCheck()} );
  
  /*users: User[] = [
    { 'mail': 'jeanmidu62@gmail.com', 'password': 'pedoncule', 'roles': ['null'] },
    { 'mail': 'mijeandu5962@gmail.com', 'password': 'edonculpe', 'roles': ['null'] }
  ];*/
  public loggedUser!: string;
  public isLoggedIn: boolean = false;
  public roles!: string[];
  public id!:number;

  userCheck(){
    let user = localStorage.getItem('loggedUser');
    for(let i = 0;i<this.users.length;i++){
      console.log(this.users[i]);
      //console.log(user);
      if(user == this.users[i].mail){
        console.log(this.id);
        console.log(this.users[i].idUser);
        //Si l'id ne correspond pas a l'utilisateur, détruire la session
        if(i+1 != +this.users[i].idUser){
          localStorage.clear();
          console.log('cleared');
        }
      }
    }
  }
  //Inscription
  SignUp(this:any,user:User){
    let exist = false;
    let validUser: Boolean = false;
    console.log(user.mail);
    this.users.forEach((currentUser:any) => {
      //check if user exist
      console.log(currentUser.mail);
      if(user.mail === currentUser.mail){
        console.log("Utilisateur déja existant");
        exist = true;
      }
    });
    //Si l'utilisateur n'existe pas, le créer.
    if(exist === false){
      console.log("Utilisateur inexistant");
      let newUser = new User;
      newUser.mail = user.mail;
      newUser.password = user.password;
      newUser.key = this.strRandom();
      validUser = true;
      console.log(newUser);
      this.service.InsertUser(newUser);
    }
    return validUser;
  }
  //Connexion
  SignIn(user: User): any {
    let validUser: Boolean = false;
    console.log(this.users);
    this.users.forEach((currentUser:any) => {
      if (user.mail === currentUser.mail && user.password === currentUser.pass) {
        this.id = currentUser.idUser;
        validUser = true;
        this.loggedUser = currentUser.mail;
        this.isLoggedIn = true;
        this.roles = currentUser.roles;
        localStorage.setItem('loggedUser', this.loggedUser);
        localStorage.setItem('isLoggedIn', String(this.isLoggedIn));
        console.log("id = "+this.id);
      }
    });
    return validUser;
  }
  //Fonction aléatoire créant une clé utilisateur
  strRandom(){
    let randomCaracters:string = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let randomLength = Math.floor(Math.random() * 62);
    let randomString:any;
    for(let i = 0;i<randomLength;i++){
      randomString += randomCaracters[Math.floor(Math.random() * randomCaracters.length)];
    }
    return randomString;
  }
}
