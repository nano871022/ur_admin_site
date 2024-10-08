import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Notification } from '@app/model/notification.model';
import { CloudMessageSenderService } from '@services/message-sender/cloud-message-sender.service';
import { FormsModule,FormBuilder,FormGroup,Validators, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-messages',
  standalone: true,
  imports: [ ReactiveFormsModule,FormsModule, MatButtonModule, MatIconModule, MatInputModule, MatFormFieldModule, MatProgressSpinnerModule, MatCardModule],
  templateUrl: './messages.component.html',
  styleUrl: './messages.component.css'
})
export class MessagesComponent implements OnInit {
  private _snackBar = inject(MatSnackBar);

  title : string = "";
  message : string = "";
  result : string = "";
  waiting: boolean = false;

  myForm: FormGroup;

  constructor(private router: Router, private senderSvc:CloudMessageSenderService, public formBuilder:FormBuilder) {
    this.myForm = this.formBuilder.group({
      title: ['', [Validators.required, Validators.minLength(5)]],
      message: ['', [Validators.required, Validators.minLength(10)]]
    });
  }

  ngOnInit(){}

  goMain(){
    this.router.navigate(['main']);
  }

  onSubmit():void{
    try{
    this.waiting = true;
    const notification :Notification = {
                                          title :this.title, 
                                          body: this.message
                                        };
    this.senderSvc.send(notification).then( data => {
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
