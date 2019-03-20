import { HomePage } from './../pages/home/home';
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

//pipes
import { PipesModule } from './../pipes/pipes.module';


//plugins firebase
import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule, AngularFireDatabase } from '@angular/fire/database';
import { AngularFireAuthModule } from '@angular/fire/auth';

//plugins
import { Camera } from '@ionic-native/camera';
import { ImagePicker } from '@ionic-native/image-picker';
import { ToastController } from 'ionic-angular';

//config firebase
export const firebaseConfig = {
  apiKey: "AIzaSyAmX-sqKo5pYw4rPokfNj6mTrC8wXMER8Q",
  authDomain: "gag-8b389.firebaseapp.com",
  databaseURL: "https://gag-8b389.firebaseio.com",
  projectId: "gag-8b389",
  storageBucket: "gag-8b389.appspot.com",
  messagingSenderId: "91661064580"
};

import { MyApp } from './app.component';
import { SubirPage } from '../pages/subir/subir';
import { CargaArchivoProvider } from '../providers/carga-archivo/carga-archivo';

@NgModule({
  declarations: [
    MyApp,
    SubirPage,
    HomePage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    PipesModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    SubirPage,
    HomePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Camera,
    ImagePicker,
    ToastController,
    AngularFireDatabase,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    CargaArchivoProvider
  ]
})
export class AppModule {}
