import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import {
    DetallePage
    }
    from '../detalle/detalle';
    
import {
    MovieServiceProvider
    }
    from '../../providers/movie-service/movie-service';
    
import { Observable } from "rxjs/Rx";
import 'rxjs/add/observable/merge';

@Component({
  selector: 'page-buscador',
  templateUrl: 'buscador.html',
})
export class BuscadorPage {
  public films: any;
  public film: string;
  public filmDetail: any;
  public filmID: number;
  public filmIMDB: string;
  public photo: string;
  
  logForm() {
      console.log(this.film)
    }
  
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public ds: MovieServiceProvider
  ) {
    this.films = [];
    this.filmDetail = [];
    this.photo;
    this.filmID = this.navParams.get('filmID');
    this.filmIMDB = this.navParams.get('filmIMDB');
  }
  
  goToFicha(filmID, filmIMDB){
    this.navCtrl.push(DetallePage, { filmID: filmID,  filmIMDB: filmIMDB });
  }
  
  goToBuscador(film){
    this.ds.getFilmSearch(this.film)
        .then( data => {
            this.filmDetail = data.results;
            this.photo = "http://image.tmdb.org/t/p/w500"+data.results[0].backdrop_path;
            console.log(data);
            this.filmDetail.forEach( (value) => {
                this.filmID = value.id;
                this.ds.getFilmDetail(this.filmID)
                .then( data => {
                    //this.films = '';
                    this.films.push({
                        id: data.id,
                        imdb_id: data.imdb_id,
                        poster_path: "http://image.tmdb.org/t/p/w500"+data.poster_path
                    });
                })
            })
        })
        .catch(error => {
            console.error(error);
        })
  }

  ionViewDidLoad() {
    console.log(this.film)
  }

}
