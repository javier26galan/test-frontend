import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';
import { environment } from 'src/environments/environment.development';
import { User } from 'src/app/models/user.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  isRegisterMode: boolean = false;
  baseUrl = environment.apiUrl;
  user!: User;

  constructor(private authService: AuthService, private router: Router) {}

  toggleMode() {
    this.isRegisterMode = !this.isRegisterMode;
  }

  onSubmit(form: NgForm) {
    let url = this.baseUrl;

    if (this.isRegisterMode) {
      url = `${this.baseUrl}/auth/register`;
    } else {
      url = `${this.baseUrl}/auth/login`;
    }
    if (form.invalid) {
      return;
    }
    const { username, password } = form.value;
    this.user = { username, password };
    this.authService.sendUser(url, this.user).subscribe((response) => {
      console.log(response);
      this.router.navigate(['/']);
    });
    form.reset();
  }
}
