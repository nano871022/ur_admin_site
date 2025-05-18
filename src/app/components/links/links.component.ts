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
  suggestionBoxUrl: string = 'not found PQR general form';
  PQRAUUrl: string = 'not found PQR general form';
  FAQAIUrl: string = 'not found PQR general form';
  hasBillingUrl: boolean = false
  hasGeneralUrl: boolean = false
  hasSuggestionBoxUrl: boolean = false
  hasFAQAIUrl: boolean = false
  waitBillingSpinner: boolean = false
  waitGeneralSpinner: boolean = false
  waitSuggestionBoxSpinner: boolean = false
  waitFAQAISpinner: boolean = false
  showBillingCard: Boolean = false
  showGeneralCard: Boolean = false
  showSuggestionBoxCard: Boolean = true
  showFAQAICard: Boolean = false

  constructor(public dataService: DataService) {
    this.waitBillingSpinner = true;
    this.waitGeneralSpinner = true;
    this.waitSuggestionBoxSpinner = true;
    this.waitFAQAISpinner = true;
      
    this.generalPqrRefresh(false);  

    this.billingPqrRefresh(false);

    this.suggestionBoxRefresh(false);

    this.faqAIRefresh(false);
   }

   generalPqrRefresh(refresh: boolean = true){
      this.dataService.getData('url_pqr_general',refresh).then((data: ResponseDefault) => {
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

   billingPqrRefresh(refresh: boolean = true){
      this.dataService.getData('url_pqr_billing',refresh).then((data: ResponseDefault) => {
        this.billingUrl = data.value;
        if(data.value.length > 0){ 
          this.hasBillingUrl = true
        }
        this.waitBillingSpinner = false
      }, (error) => {
        this.waitBillingSpinner = false
        this.billingUrl = 'Error al obtener información del servidor, por favor reintente mas tarde.';
      });
   }

    suggestionBoxRefresh(refresh: boolean = true){
      this.dataService.getData('url_suggestion_box',refresh).then((data: ResponseDefault) => {
        this.suggestionBoxUrl = data.value;
        if(data.value.length > 0){ 
          this.hasSuggestionBoxUrl = true
        }
        this.waitSuggestionBoxSpinner = false
      }, (error) => {
        this.waitSuggestionBoxSpinner = false
        this.suggestionBoxUrl = 'Error al obtener información del servidor, por favor reintente mas tarde.';
      });
   }

     faqAIRefresh(refresh: boolean = true){
      this.dataService.getData('url_faq_ai',refresh).then((data: ResponseDefault) => {
        this.FAQAIUrl = data.value;
        if(data.value.length > 0){ 
          this.hasFAQAIUrl = true
        }
        this.waitFAQAISpinner = false
      }, (error) => {
        this.waitFAQAISpinner = false
        this.FAQAIUrl = 'Error al obtener información del servidor, por favor reintente mas tarde.';
      });
   }

}
