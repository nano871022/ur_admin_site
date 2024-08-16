import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-messages',
  standalone: true,
  imports: [],
  templateUrl: './messages.component.html',
  styleUrl: './messages.component.css'
})
export class MessagesComponent {

  constructor(private router: Router) {}
  goMain(){
    this.router.navigate(['main']);
    }

  clean(){}
}
