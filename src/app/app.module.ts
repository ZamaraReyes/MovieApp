import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { HttpModule } from '@angular/http';
import { TabsPage } from '../pages/tabs/tabs';

import {
    MyApp
    }
    from './app.component';
    
import {
    HomePage
    }
    from '../pages/home/home';
    
import {
    ListPage
    }
    from '../pages/list/list';

import {
    GenerosPage
    }
    from '../pages/generos/generos';

import {
    ListapelisPage
    }
    from '../pages/listapelis/listapelis';

import {
    DetallePage
    }
    from '../pages/detalle/detalle';
    
import {
    VertodosPage
    }
    from '../pages/vertodos/vertodos';
    
import {
    BuscadorPage
    }
    from '../pages/buscador/buscador';

import {
    Prueba
    }
    from '../pages/prueba/prueb';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { MovieServiceProvider } from '../providers/movie-service/movie-service';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage,
    GenerosPage,
    ListapelisPage,
    DetallePage,
    VertodosPage,
    BuscadorPage,
    TabsPage,
    Prueba
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ListPage,
    GenerosPage,
    ListapelisPage,
    DetallePage,
    VertodosPage,
    BuscadorPage,
    TabsPage,
    Prueba
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    MovieServiceProvider
  ]
})
export class AppModule {}
