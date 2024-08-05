import { Routes } from '@angular/router';
import { MessagesComponent } from './messages/messages.component'
import { AuthenticationComponent } from './authentication/authentication.component'

export const routes: Routes = [
 { path: 'messages', component: MessagesComponent},
 { path: 'auth', component: AuthenticationComponent}
];
