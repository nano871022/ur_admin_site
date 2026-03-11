import { Component, OnInit } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';

import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AuthenticationComponent } from '@components/authentication/authentication.component';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { Title } from '@angular/platform-browser'
import { environment } from '@src/environments/environment';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, AuthenticationComponent, RouterLink, RouterLinkActive, MatToolbarModule, MatIconModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  since_yearly = '2021 - 2025'
  name = environment.projectName;
  title = 'Administración ${name}';
  main_message = 'Bienvenido a la página de administración de ${name} APP';
  isLogged: boolean = false

  constructor(private angularFireAuth:AngularFireAuth) {
    this.getAuth()
  }

  ngOnInit(){
    this.titleService.setTitle(name);
    this.title = 'Administración ${name}';
    this.main_message = 'Bienvenido a la página de administración de ${name} APP';
  }

  async getAuth(){
    await this.angularFireAuth.onAuthStateChanged(user => {
      if (user !== null) {
        this.isLogged = true;
      }else{
        this.isLogged = false;
      }
    });
  }

}
