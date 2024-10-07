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
  hasImagesFolder: boolean = false
  hasFilesFolder: boolean = false
  waitImageSpinner: boolean = false
  waitFolderSpinner: boolean = false

  constructor(private dataService: DataService ){
    this.waitImageSpinner = true;
    this.waitFolderSpinner = true;
    this.dataService.getData('folder_docs').subscribe( data => {
      this.imagesFolder = (data as ResponseDefault).value;
      if(this.imagesFolder != 'not found images folder') this.hasImagesFolder = true
        this.waitImageSpinner = false
    }, err => {
      this.waitImageSpinner = false
      this.dataService.unAuthenticate();
      this.imagesFolder = 'Error al obtener información del servidor, por favor reintente más tarde'
    });
      
    
    this.dataService.getData('folder_img').subscribe( data => {
      this.filesFolder = (data as ResponseDefault).value;
      if(this.filesFolder != 'not found files folder') this.hasFilesFolder = true
        this.waitFolderSpinner = false
    }, err => {
      this.waitFolderSpinner = false
      this.dataService.unAuthenticate();
      this.filesFolder = 'Error al obtener información del servidor, por favor reintente más tarde'
    });
      
    
  }

}