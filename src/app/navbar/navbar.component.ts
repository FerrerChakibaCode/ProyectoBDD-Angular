import { Component } from '@angular/core';
import { UserService } from '../services/user.service';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { filter, Observable } from 'rxjs';
import { map } from '@firebase/util';
import { getAuth, onAuthStateChanged } from "firebase/auth";


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  isLogged: boolean | undefined;

  constructor(
    private userService: UserService,
    private router: Router,
    private authServ: AuthService
  ) {
    // this.isLogged = this.checkLogin();
  }



// checkLogin(route: ActivatedRouteSnapshot): Observable<boolean> {
//   return this.authServ.authState$.pipe(
//     filter((user)=> user !== undefined),
//     map((user) => {
//       console.log('user: ', user);
//       if(!user) {
//         this.router.navigate(['/login']);
//         return false
//       }
//       return true;

//     })
//   );
// }

prueba() {
  console.log(this.isLogged);

}

handleLogout() {
  this.userService.logout().then(
    () => {
      this.router.navigate(['/login']);
      console.log('Logout successful');
    }
  ).catch(error => console.log(error));

}

}
