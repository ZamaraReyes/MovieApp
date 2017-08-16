import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import {
    ListapelisPage
    }
    from '../listapelis/listapelis';

import {
    MovieServiceProvider
    }
    from '../../providers/movie-service/movie-service';


@Component({
  selector: 'page-list',
  templateUrl: 'list.html',
  providers: [ MovieServiceProvider ]
})
export class ListPage {
  selectedItem: any;
  icons: string[];
  items: Array<{title: string, note: string, icon: string}>;
  films: any[] = [];

  constructor(
      public navCtrl: NavController,
      public navParams: NavParams,
      public ds: MovieServiceProvider
  ) {
  }
  
  goToListaPelis(listID) {
    this.navCtrl.push(ListapelisPage, {listID: listID});
  }
  
  ionViewDidLoad() {

    /*this.ds.getFilms()
        .then( data => {
            this.films = data.results;
            console.log(data);
        })
        .catch(error => {
            console.error(error);
        })*/
    }
}
