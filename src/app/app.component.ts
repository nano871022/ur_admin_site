import { Component } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';

import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AuthenticationComponent } from './authentication/authentication.component';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, AuthenticationComponent, RouterLink, RouterLinkActive, MatToolbarModule, MatIconModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Administración Unidad Residencial Torres San Sebastian TSS';
  isLogged: boolean = false

  constructor(private angularFireAuth:AngularFireAuth) {
    this.getAuth()
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
