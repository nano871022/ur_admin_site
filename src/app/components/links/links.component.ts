import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIcon } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { DataService } from '@services/data/data.service';
import { ResponseDefault } from '@app/model/response-default.model';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';


@Component({
  selector: 'app-links',
  standalone: true,
  imports: [MatCardModule, MatIcon, MatButtonModule, MatProgressSpinnerModule],
  templateUrl: './links.component.html',
  styleUrl: './links.component.css'
})
export class LinksComponent {

  billingUrl: string = 'not found PQR Billing form';
  generalUrl: string = 'not found PQR general form';
  hasBillingUrl: boolean = false
  hasGeneralUrl: boolean = false
  waitBillingSpinner: boolean = false
  waitGeneralSpinner: boolean = false

  constructor(public dataService: DataService) {
    this.waitBillingSpinner = true;
    this.waitGeneralSpinner = true;
      dataService.getData('url_pqr_billing').subscribe((data: ResponseDefault) => {
        this.billingUrl = data.value;
        if(data.value.length > 0){ 
          this.hasBillingUrl = true
        }
        this.waitBillingSpinner = false
      }, (error) => {
        this.waitBillingSpinner = false
        this.billingUrl = 'Error al obtener información del servidor, por favor reintente mas tarde.';
      });
        
      
      dataService.getData('url_pqr_general').subscribe((data: ResponseDefault) => {
        this.generalUrl = data.value;
        if(data.value.length > 0){ 
          this.hasGeneralUrl = true
        }
        this.waitGeneralSpinner = false
      }, (error) => {
        this.waitGeneralSpinner = false
        this.generalUrl = 'Error al obtener información del servidor, por favor reintente mas tarde.';
      });
        
      
   }

}
