import { Component } from '@angular/core';
import { AuthService } from './auth/auth.service';
import { environment } from 'src/environments/environment.development';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  baseUrl: string = environment.apiUrl
  constructor(private authService: AuthService){}

  onLogout(){
    console.log("app");
    this.authService.logout(this.baseUrl);
  }
}
