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
  result : string = "";
  showMessage: boolean = false;

  constructor(private router: Router, private senderSvc:CloudMessageSenderService) {}

  goMain(){
    this.router.navigate(['main']);
  }

  onSubmit():void{
    this.senderSvc.requestPermission();
    const notification :Notification = {
                                          title :this.title, 
                                          body: this.message
                                        };
    this.senderSvc.send(notification).subscribe( data => {
      this.showMessage = true
      this.result = (data as any).description;
      this.clean();
      
    });
  }

  clean(){
    this.title = "";
    this.message = "";
  }
}
