import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MessagesComponent } from './messages/messages.component';
import { AuthenticationComponent } from './authentication/authentication.component';
import { MainComponent } from './main/main.component';
import { authGuard } from './auth.guard';
import { AppComponent } from './app.component';


export const routes: Routes = [
 { path: 'messages', component: MessagesComponent , canActivate: [authGuard] },
 { path: 'main'    , component: MainComponent , canActivate: [authGuard] },
 { path: '/'    , component: AppComponent },
];
@NgModule({
	imports: [RouterModule.forRoot(routes)],	
	exports: [RouterModule]
})
export class AppRoutingModule { }