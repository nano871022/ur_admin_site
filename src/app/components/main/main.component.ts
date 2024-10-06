import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { RouterLink, Router, RouterOutlet } from '@angular/router';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [RouterLink,RouterOutlet, MatSidenavModule, MatIconModule, MatButtonModule,MatListModule],
  templateUrl: './main.component.html',
  styleUrl: './main.component.css'
})
export class MainComponent {
  
constructor(private auth: AngularFireAuth, private router:Router){}

goMessages(){
  this.router.navigate(['messages']);
}

}
