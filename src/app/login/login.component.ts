import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  formLogin: FormGroup;

  constructor(
    private userService: UserService,
    private router: Router
  ) {
    this.formLogin = new FormGroup({
      email: new FormControl(),
      password: new FormControl()
    })

  }

  onSubmit() {
    this.userService.login(this.formLogin.value)
      .then(response => { console.log(response); this.router.navigate(['']) })
      .catch(error => console.log(error));
  }

  handleSigninWithGoogle() {
    this.userService.loginWithGoogle()
      .then(response => { console.log(response); this.router.navigate(['']) })
      .catch(error => console.log(error));
  }

}
