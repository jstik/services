import {Component} from "@angular/core";
import {AuthenticationService} from "../service/authentication.service";


@Component({
   moduleId : module.id.toString(),
   templateUrl: 'home.html'
})

export class HomeComponent{
   constructor(private authService : AuthenticationService){
   }

   logout(){
      this.authService.logout();
   }
}