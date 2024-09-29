import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Notification } from '../model/notification.model';
import { CloudMessageSenderService } from '../services/message-sender/cloud-message-sender.service';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-messages',
  standalone: true,
  imports: [ FormsModule, MatButtonModule, MatIconModule, MatInputModule, MatFormFieldModule, MatProgressSpinnerModule],
  templateUrl: './messages.component.html',
  styleUrl: './messages.component.css'
})
export class MessagesComponent {
  private _snackBar = inject(MatSnackBar);

  title : string = "";
  message : string = "";
  result : string = "";
  waiting: boolean = false;

  constructor(private router: Router, private senderSvc:CloudMessageSenderService) {}

  goMain(){
    this.router.navigate(['main']);
  }

  onSubmit():void{
    try{
    this.waiting = true;
    this.senderSvc.requestPermission();
    if(this.senderSvc.token == null){
      this.waiting = false;
      this.result = "No se pudo obtener el token";
      this.openSnackBar(this.result, "Cerrar");
      return;
    }
    const notification :Notification = {
                                          title :this.title, 
                                          body: this.message
                                        };
    this.senderSvc.send(notification).subscribe( data => {
      this.waiting = false;
      this.result = (data as any).description;
      this.openSnackBar(this.result, "Cerrar");
      this.clean();
      
    });
  }catch(e){  
    this.waiting = false;
    this.openSnackBar("Sucedio un error intente más tarde.", "Cerrar");
    console.log(e);
  }
  }

  clean(){
    this.title = "";
    this.message = "";
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action);
  }
}
