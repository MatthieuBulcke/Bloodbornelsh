import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { User } from '../model/user.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [
  ]
})
export class LoginComponent implements OnInit {
  button:any;
  inscriptionButton:any;
  spans:any;
  constructor(private authService:AuthService,private router: Router) { }

  ngOnInit(): void {
  }
  onLoggedin(){
    let user = new User();
    //console.log((document.getElementsByTagName('input')[0]).value);
    user.mail=(document.getElementsByTagName('input')[0]).value;
    user.password=(document.getElementsByTagName('input')[1]).value;
    //console.log(user);
    
    let isValidUser:Boolean = this.authService.SignIn(user);
    if(isValidUser){
      this.router.navigate(['/']);
    }
    else{
      let inputs = document.getElementsByTagName('input');
      let error = document.getElementById('error') as HTMLElement;
      inputs[0].classList.add("red");
      inputs[1].classList.add("red");
      error.innerHTML = "Adresse mail ou mot de passe incorect"
    }
  }
  onSignIn(){
    let user = new User();
    user.mail=(document.getElementsByTagName('input')[2]).value;
    user.password=(document.getElementsByTagName('input')[3]).value;

    let isValidUser:Boolean = this.authService.SignUp(user);
    console.log(isValidUser)
    if(isValidUser===true){
      this.switchCase;
    }
    else{
    let inputs = document.getElementsByTagName('input');
    let error = document.getElementById('error') as HTMLElement;
    inputs[2].classList.add("red");
    inputs[3].classList.add("red");
    error.innerHTML = "Adresse mail ou mot de passe incorect"
    }
  }
  switchCase(){
    let forms = document.getElementsByTagName("form");
    forms[0].classList.toggle('empty');
    forms[1].classList.toggle('empty');
    let inputs = document.getElementsByTagName('input');
    let error = document.getElementById('error') as HTMLElement;
    inputs[0].classList.remove("red");
    inputs[1].classList.remove("red");
    inputs[2].classList.remove("red");
    inputs[3].classList.remove("red");
    error.innerHTML = "";
  }
  ngAfterViewInit() {
    this.button = (document.getElementsByTagName('button')[9]).addEventListener("click",this.onLoggedin.bind(this));
    this.inscriptionButton = (document.getElementsByTagName('button')[10]).addEventListener("click",this.onSignIn.bind(this));
    this.spans = document.getElementsByTagName('span');
    console.log(this.spans)
    this.spans[1].addEventListener('click',this.switchCase);
    this.spans[2].addEventListener('click',this.switchCase);
    //console.log(document.getElementsByTagName('button')[9]);
    //console.log(this.authService);
  };
}
