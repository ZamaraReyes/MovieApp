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
  public genreName: string;
  public filmIMDB: string;
  public photos: any;
  
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public ds: MovieServiceProvider
  ) {
    this.films = [];
    this.filmDetail = [];
    this.photos = [];
    this.genreID = this.navParams.get('genreID');
    this.filmID = this.navParams.get('filmID');
    this.genreName = this.navParams.get('genreName');
    this.filmIMDB = this.navParams.get('filmIMDB');
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
                    if(data.vote_average > 0){
                        this.films.push({
                            id: data.id,
                            imdb_id: data.imdb_id,
                            poster_path: "http://image.tmdb.org/t/p/w500/"+data.poster_path
                        });
                    }
                })
                this.ds.getFilmVotes(this.filmIMDB)
                .then( data => {
                    this.films.push({
                        runtime: data.Runtime
                    });
                })
            })
        })
        .catch(error => {
            console.error(error);
        })
        
    this.ds.getListFilms2(this.genreID)
        .then( data => {
            this.filmDetail = data.results;
            this.filmDetail.forEach( (value) => {
                this.filmID = value.id;
                this.ds.getFilmDetail(this.filmID)
                .then( data => {
                    if(data.vote_average > 0){
                        this.films.push({
                            id: data.id,
                            imdb_id: data.imdb_id,
                            poster_path: "http://image.tmdb.org/t/p/w500/"+data.poster_path
                        });
                    }
                })
                this.ds.getFilmVotes(this.filmIMDB)
                .then( data => {
                    this.films.push({
                        runtime: data.Runtime
                    });
                })
            })
        })
        .catch(error => {
            console.error(error);
        })
        
    this.ds.getListFilms3(this.genreID)
        .then( data => {
            this.filmDetail = data.results;
            this.filmDetail.forEach( (value) => {
                this.filmID = value.id;
                this.ds.getFilmDetail(this.filmID)
                .then( data => {
                    if(data.vote_average > 0 || data.poster_path != null){
                        this.films.push({
                            id: data.id,
                            imdb_id: data.imdb_id,
                            poster_path: "http://image.tmdb.org/t/p/w500/"+data.poster_path
                        });
                    }
                })
                this.ds.getFilmVotes(this.filmIMDB)
                .then( data => {
                    this.films.push({
                        runtime: data.Runtime
                    });
                })
            })
        })
        .catch(error => {
            console.error(error);
        })
  }

}
