import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app.routes';
import { AppComponent } from './app.component';
import { FIREBASE_OPTIONS, AngularFireAuth } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFireModule } from '@angular/fire';
import { environment } from '../environments/environment';
import { FormsModule } from '@angular/forms';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { AuthenticationComponent } from './authentication/authentication.component';

@NgModule({
	declarations: [	AppComponent],
	imports: [
		AngularFireAuthModule,	
		AngularFireModule.initializeApp(environment.firebaseConfig),
		BrowserModule,
		AppRoutingModule,
		FormsModule,
		provideFirebaseApp(() => initializeApp(environment.firebaseConfig)),
		provideAuth(() => getAuth()),
		provideFirestore(() => getFirestore()),
		AuthenticationComponent,

		)
	],
	providers: [{provide: FIREBASE_OPTIONS, useValue: environment.firebaseConfig}],
	bootstrap: [AppComponent]
})
export class AppModule { }