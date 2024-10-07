import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withFetch } from '@angular/common/http';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';

import { CloudMessageSenderService } from '@services/message-sender/cloud-message-sender.service';
import { DataService } from '@services/data/data.service';
import { environment } from '@src/environments/environment';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { provideAuth, getAuth } from '@angular/fire/auth';

import { FIREBASE_OPTIONS } from '@angular/fire/compat';

import { getMessaging, provideMessaging } from '@angular/fire/messaging';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

export const appConfig: ApplicationConfig = {
  providers: [
      provideZoneChangeDetection({ eventCoalescing: true })
    , provideRouter(routes)
    , provideClientHydration()
    , provideFirebaseApp(() => initializeApp(environment.firebaseConfig))
    , provideFirestore(() => getFirestore())
    , provideAuth(() => getAuth())
    , provideHttpClient(withFetch())
    , provideMessaging(() => getMessaging())
    , {provide: FIREBASE_OPTIONS, useValue: environment.firebaseConfig}
    , CloudMessageSenderService, provideAnimationsAsync()
    , DataService, provideAnimationsAsync()
    ]
};
