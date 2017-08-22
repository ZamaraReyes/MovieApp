import { Component, ViewChild } from '@angular/core';
import { Nav } from 'ionic-angular';
import { NavController, NavParams, LoadingController } from 'ionic-angular';
    
import {
    VertodosPage
    }
    from '../vertodos/vertodos';
    
import {
    DetallePage
    }
    from '../detalle/detalle';

import {
    MovieServiceProvider
    }
    from '../../providers/movie-service/movie-service';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers: [ MovieServiceProvider ]
})
export class HomePage {
    public films: any;
    public filmsPlaying: any;
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
    public photos: any;
    
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public ds: MovieServiceProvider,
    public loadingCtrl: LoadingController
  ) {
    this.films = [];
    this.filmDetail = [];
    this.filmsPlaying = [];
    this.filmsRated = [];
    this.filmsPopular = [];
    this.filmsComing = [];
    this.genreFilms = [];
    this.filmsGenre = [];
    this.filmID = this.navParams.get('filmID');
    this.filmIMDB = this.navParams.get('filmIMDB');
    this.genreID = this.navParams.get('genreID');
    this.listID = this.navParams.get('listID');
    this.photos = [];
    this.photo;
    this.loader = this.loadingCtrl.create();
  }
  
  goToFicha(filmID, filmIMDB){
    this.navCtrl.push(DetallePage, { filmID: filmID,  filmIMDB: filmIMDB });
  }
  
  goToVerTodos(listID){
    this.navCtrl.push(VertodosPage, { listID: listID });
  }
  
  ionViewDidLoad() {
    this.ds.getFilmsPlaying()
        .then( data => {
            this.filmDetail = data.results;
            /*this.photo = "http://image.tmdb.org/t/p/w500"+data.results[0].backdrop_path;*/
            this.filmDetail.forEach( (value) => {
                this.filmID = value.id;
                this.ds.getFilmDetail(this.filmID)
                .then( data => {
                    this.filmsPlaying.push({
                        id: data.id,
                        title: data.title,
                        imdb_id: data.imdb_id,
                        poster_path: "http://image.tmdb.org/t/p/w500"+data.poster_path
                    });
                    
                    this.photos.push({
                        photo: "http://image.tmdb.org/t/p/w500"+data.poster_path
                    })
                })
            })
        })
        .catch(error => {
            console.error(error);
        })
        
    this.ds.getFilmsComing()
        .then( data => {
            this.filmDetail = data.results;
            this.photo = "http://image.tmdb.org/t/p/w500"+data.results[0].backdrop_path;
            this.filmDetail.forEach( (value) => {
                this.filmID = value.id;
                this.ds.getFilmDetail(this.filmID)
                .then( data => {
                    this.filmsComing.push({
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
    }
}
