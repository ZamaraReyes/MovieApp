import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController } from 'ionic-angular';
import {BrowserModule, DomSanitizer} from '@angular/platform-browser'

import {
    ListapelisPage
    }
    from '../listapelis/listapelis';
    
import {
    VertodosPage
    }
    from '../vertodos/vertodos';
    
import {
    DetallePage
    }
    from '../detalle/detalle';
    
import {
    BuscadorPage
    }
    from '../buscador/buscador';

import {
    MovieServiceProvider
    }
    from '../../providers/movie-service/movie-service';


import { Observable } from "rxjs/Rx";
import 'rxjs/add/observable/merge';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers: [ MovieServiceProvider ]
})
export class HomePage {
    public films: any;
    public filmsRated: any;
    public filmsPopular: any;
    public filmsComing: any;
    public filmDetail: any;
    public similarFilms: any;
    public genreFilms: any;
    public filmsGenre: any;
    public filmID: number;
    public genreID: number;
    public filmIMDB: string;
    public listID: string;
    public videoFilm: string;
    public loader: any;
    public photo: string;
    
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public ds: MovieServiceProvider,
    private sanitizer: DomSanitizer,
    public loadingCtrl: LoadingController
  ) {
    this.films = [];
    this.filmDetail = [];
    this.filmsRated = [];
    this.filmsPopular = [];
    this.filmsComing = [];
    this.genreFilms = [];
    this.filmsGenre = [];
    this.filmID = this.navParams.get('filmID');
    this.filmIMDB = this.navParams.get('filmIMDB');
    this.genreID = this.navParams.get('genreID');
    this.listID = this.navParams.get('listID');
    this.photo;
    //this.loader = this.loadingCtrl.create();
  }
  
  goToFicha(filmID, filmIMDB){
    this.navCtrl.push(DetallePage, { filmID: filmID,  filmIMDB: filmIMDB });
  }
  
  goToVerTodos(listID){
    this.navCtrl.push(VertodosPage, { listID: listID });
  }
  
  goToBuscador(){
    this.navCtrl.push(BuscadorPage, {});
  }
  
  goToListGenre(genreID) {
    this.ds.getListGenres()
        .then( data => {
            this.genreFilms = data.genres;
            this.genreFilms.forEach( (value) => {
                this.genreID = value.id;
                this.ds.getListFilms(this.genreID)
                    .then(data => {
                    this.filmDetail = data.results;
                    this.filmDetail.forEach( (value) => {
                        this.filmID = value.id;
                        this.ds.getFilmDetail(this.filmID)
                        .then( data => {
                            this.filmsGenre.push({
                                title: data.title,
                                id: data.id,
                                imdb_id: data.imdb_id,
                                poster_path: "http://image.tmdb.org/t/p/w500"+data.poster_path,
                                backdrop_path: "http://image.tmdb.org/t/p/w500"+data.backdrop_path,
                                vote_average: data.vote_average
                            });
                        console.log(data)
                    })
                    .catch(error => {
                        console.error(error);
                    })
                
                })
                .catch(error => {
                    console.error(error);
                })
            })
            .catch(error => {
                console.error(error);
            })
        })
    })
  }
  
  ionViewDidLoad() {    
    this.ds.getFilmsComing()
        .then( data => {
            this.filmDetail = data.results;
            this.photo = "http://image.tmdb.org/t/p/w500"+data.results[0].backdrop_path;
            this.filmDetail.forEach( (value) => {
                this.filmID = value.id;
                this.ds.getFilmDetail(this.filmID)
                .then( data => {
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
        
    this.ds.getFilmsBest()
        .then( data => {
            this.filmDetail = data.results;
            this.filmDetail.forEach( (value) => {
                this.filmID = value.id;
                this.ds.getFilmDetail(this.filmID)
                .then( data => {
                    this.filmsRated.push({
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
        
    this.ds.getFilmsPopular()
        .then( data => {
            this.filmDetail = data.results;
            this.filmDetail.forEach( (value) => {
                this.filmID = value.id;
                this.ds.getFilmDetail(this.filmID)
                .then( data => {
                    this.filmsPopular.push({
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
    
    /*this.ds.getListGenres()
        .then( data => {
            this.genreFilms = data.genres;
            this.genreFilms.forEach( (value) => {
                this.genreID = value.id;
                this.ds.getListFilms(this.genreID)
                    .then(data => {
                    this.filmDetail = data.results;
                    this.filmDetail.forEach( (value) => {
                        this.filmID = value.id;
                        this.ds.getFilmDetail(this.filmID)
                        .then( data => {
                            this.filmsGenre.push({
                                title: data.title,
                                id: data.id,
                                imdb_id: data.imdb_id,
                                poster_path: "http://image.tmdb.org/t/p/w500"+data.poster_path,
                                backdrop_path: "http://image.tmdb.org/t/p/w500"+data.backdrop_path,
                                vote_average: data.vote_average
                            });
                        console.log(data)
                    })
                    .catch(error => {
                        console.error(error);
                    })
                
                })
                .catch(error => {
                    console.error(error);
                })
            })
            .catch(error => {
                console.error(error);
            })
        })
    })*/
        
    }
}
