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
  selector: 'page-listapelis',
  templateUrl: 'listapelis.html',
  providers: [ MovieServiceProvider ]
})
export class ListapelisPage {
  public films: any;
  public film: any;
  public filmDetail: any;
  public genreID: number;
  public filmID: number;
  public filmIMDB: string;
  
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public ds: MovieServiceProvider
  ) {
    this.films = [];
    this.filmDetail = [];
    this.genreID = this.navParams.get('genreID');
    this.filmID = this.navParams.get('filmID');
    this.filmIMDB = this.navParams.get('filmIMDB');
  }
  
  goToListaPelis(genreID) {
    this.navCtrl.push(ListapelisPage, { genreID: genreID });
  }
  
  goToFicha(filmID, filmIMDB){
    this.navCtrl.push(DetallePage, { filmID: filmID,  filmIMDB: filmIMDB });
  }

  ionViewDidLoad() {
    this.ds.getListFilms(this.genreID)
        .then( data => {
            this.filmDetail = data.results;
            this.filmDetail.forEach( (value) => {
                this.filmID = value.id;
                this.ds.getFilmDetail(this.filmID)
                .then( data => {
                    this.films.push({
                        title: data.title,
                        id: data.id,
                        imdb_id: data.imdb_id,
                        poster_path: "http://image.tmdb.org/t/p/w500/"+data.poster_path,
                        vote_average: data.vote_average
                    });
                    console.log(data);
                })
                this.ds.getFilmVotes(this.filmIMDB)
                .then( data => {
                    this.films.push({
                        runtime: data.Runtime
                    });
                    console.log(data);
                    console.log(this.films.imdb_id);
                })
                .catch(error => {
                    console.error(error);
                })
                .catch(error => {
                    console.error(error);
                }) 
            })
            console.log(data);
        })
        .catch(error => {
            console.error(error);
        })
  }

}
