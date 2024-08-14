import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MessagesComponent } from './messages/messages.component';
import { AuthenticationComponent } from './authentication/authentication.component';
import { MainComponent } from './main/main.component';
import { authGuard } from './auth.guard';

export const routes: Routes = [
 { path: 'auth'    , component: AuthenticationComponent },
 { path: 'messages', component: MessagesComponent },
 { path: 'main'    , component: MainComponent },
];
@NgModule({
	imports: [RouterModule.forRoot(routes)],	
	exports: [RouterModule]
})
export class AppRoutingModule { }