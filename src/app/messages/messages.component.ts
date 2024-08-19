import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Notification } from '../model/notification.model';
import { CloudMessageSenderService } from '../services/message-sender/cloud-message-sender.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-messages',
  standalone: true,
  imports: [ FormsModule  ],
  templateUrl: './messages.component.html',
  styleUrl: './messages.component.css'
})
export class MessagesComponent {

  title : string = "";
  message : string = "";

  constructor(private router: Router, private senderSvc:CloudMessageSenderService) {}

  goMain(){
    this.router.navigate(['main']);
  }

  onSubmit():void{
    const notification :Notification = {
                                          title :this.title, 
                                          body: this.message
                                        };
    this.senderSvc.send(notification).subscribe({
      next: (res) => {
        console.log("Notification sent succesfull.",res); 
      },
      error: (err) => {
        console.error("Error sending notification",err);
      }
      
    });
  }

  clean(){
    this.title = "";
    this.message = "";
  }
}
