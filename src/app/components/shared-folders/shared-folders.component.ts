import { Component } from '@angular/core';
import { DataService } from '@services/data/data.service';
import { MatCardModule } from '@angular/material/card';
import { ResponseDefault } from '@app/model/response-default.model';
import { MatButtonModule } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-shared-folders',
  standalone: true,
  imports: [MatCardModule, MatButtonModule, MatIcon, MatProgressSpinnerModule],
  templateUrl: './shared-folders.component.html',
  styleUrl: './shared-folders.component.css'
})
export class SharedFoldersComponent {

  imagesFolder: string = 'not found images folder';
  filesFolder: string = 'not found files folder';
  emailUserDrive: string = 'not found email user drive';
  hasImagesFolder: boolean = false
  hasFilesFolder: boolean = false
  hasEmailUserDrive: boolean = false
  waitImageSpinner: boolean = false
  waitFolderSpinner: boolean = false
  waitEmailUserDriveSpinner: boolean = false

  constructor(private dataService: DataService ){
    this.waitImageSpinner = true;
    this.waitFolderSpinner = true;
    this.waitEmailUserDriveSpinner = true;
      
    this.filesSharedRefresh(false);

    this.imagesSharedRefresh(false);

    this.emailUserDrive(false);
  }

  filesSharedRefresh(refresh: boolean = true){
    this.dataService.getData('folder_docs',refresh).then( data => {
      this.imagesFolder = (data as ResponseDefault).value;
      if(this.imagesFolder != 'not found images folder') this.hasImagesFolder = true
        this.waitImageSpinner = false
    }, err => {
      this.waitImageSpinner = false
      this.imagesFolder = 'Error al obtener información del servidor, por favor reintente más tarde'
    });
  }

  imagesSharedRefresh(refresh: boolean = true){
    this.dataService.getData('folder_img',refresh).then( data => {
      this.filesFolder = (data as ResponseDefault).value;
      if(this.filesFolder != 'not found files folder') this.hasFilesFolder = true
        this.waitFolderSpinner = false
    }, err => {
      this.waitFolderSpinner = false
      this.filesFolder = 'Error al obtener información del servidor, por favor reintente más tarde'
    });
  }

  emailUserDrive(refresh: boolean = true){
      this.dataService.getData('email_user_drive',refresh).then((data: ResponseDefault) => { 
        this.emailUserDrive = data.value;
        if(data.value.length > 0){
         this.hasEmailUserDrive = true 
        }
        this.waitEmailUserDriveSpinner = false
      }, (error) => {
        this.waitEmailUserDriveSpinner = false
        this.emailUserDrive = 'Error al obtener información del servidor, por favor reintente mas tarde.';
      });
        
      
   }

}
