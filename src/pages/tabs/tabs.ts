import { Component } from '@angular/core';

import {
    HomePage
    }
    from '../home/home';
    
import {
    GenerosPage
    }
    from '../generos/generos';

import {
    BuscadorPage
    }
    from '../buscador/buscador';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = BuscadorPage;
  tab3Root = GenerosPage;

  constructor() {

  }
}
