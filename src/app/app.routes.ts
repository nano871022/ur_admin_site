import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MessagesComponent } from '@components/messages/messages.component';
import { HomeComponent } from '@components/home/home.component';
import { AuthenticationComponent } from '@components/authentication/authentication.component';
import { MainComponent } from '@components/main/main.component';
import { LinksComponent } from '@components/links/links.component';
import { SharedFoldersComponent } from '@components/shared-folders/shared-folders.component';
import { authGuard } from './auth.guard';
import { AppComponent } from './app.component';


export const routes: Routes = [
	
 	{ path: 'main'    , component: MainComponent , canActivate: [authGuard] , children: [
 		{ path: '', redirectTo: 'home', pathMatch: 'full' },
 		{ path: 'home', component: HomeComponent , canActivate: [authGuard]},
		{ path: 'messages', component: MessagesComponent , canActivate: [authGuard]},
		{ path: 'shared_folder', component: SharedFoldersComponent , canActivate: [authGuard]},
		{ path: 'links', component: LinksComponent , canActivate: [authGuard]},

 	]},
 	{ path: ''    , component: AppComponent },
 	{ path: '', redirectTo: '/', pathMatch: 'full' },
 
];
@NgModule({
	imports: [RouterModule.forRoot(routes)],	
	exports: [RouterModule]
})
export class AppRoutingModule { }