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
  selector: 'page-generos',
  templateUrl: 'generos.html',
  providers: [ MovieServiceProvider ]
})
export class GenerosPage {
    selectedItem: any;

  public films: any;
  public filmDetail: any;
  public genreID: number;
  public filmID: number;
  public genreName: string;
  public genreFilms: any;
  public photo: any;
  public photoAction: string;
  public photoAdventure: string;
  public photoAnimation: string;
  public photoComedy: string;
  public photoCrime: string;
  public photoDocumentary: string;
  public photoDrama: string;
  public photoFamily: string;
  public photoFantasy: string;
  public photoHistory: string;
  public photoHorror: string;
  public photoMusic: string;
  public photoMistery: string;
  public photoRomance: string;
  public photoScience: string;
  public photoMovie: string;
  public photoThriller: string;
  public photoWar: string;
  public photoWestern: string;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public ds: MovieServiceProvider
  ) {
    this.films = [];
    this.filmDetail = [];
    this.genreFilms = [];
    this.photo = [];
    this.filmID = this.navParams.get('filmID');
    this.genreName = this.navParams.get('genreName');
    this.genreID = this.navParams.get('genreID');
    //this.loader = this.loadingCtrl.create();
  }
  
  goToListaPelis(genreID, genreName) {
    this.navCtrl.push(ListapelisPage, { genreID: genreID, genreName: genreName });
  }

  ionViewDidLoad() {
    this.ds.getListGenres()
        .then( data => {
            this.genreFilms = data.genres;
            this.genreFilms.forEach( (value) => {
                this.genreID = value.id;
                this.ds.getListFilms(this.genreID)
                    .then(data => {
                    this.filmDetail = data.results;
                    console.log(data);
                })
                this.ds.getListFilms2(this.genreID)
                    .then(data => {
                    this.filmDetail = data.results;
                    console.log(data);
                })
                .catch(error => {
                    console.error(error);
                })
            })
        })
        
        this.ds.getFilmDetail(315635)
            .then( data => {
            this.photoAction = "http://image.tmdb.org/t/p/w500"+data.backdrop_path;
        })
        
        this.ds.getFilmDetail(22)
            .then( data => {
            this.photoAdventure = "http://image.tmdb.org/t/p/w500"+data.backdrop_path;
        })
        
        this.ds.getFilmDetail(10193)
            .then( data => {
            this.photoAnimation = "http://image.tmdb.org/t/p/w500"+data.backdrop_path;
        })
        
        this.ds.getFilmDetail(18785)
            .then( data => {
            this.photoComedy = "http://image.tmdb.org/t/p/w500"+data.backdrop_path;
        })
        
        this.ds.getFilmDetail(238)
            .then( data => {
            this.photoCrime = "http://image.tmdb.org/t/p/w500"+data.backdrop_path;
        })
        
        this.ds.getFilmDetail(465171)
            .then( data => {
            this.photoDocumentary = "http://image.tmdb.org/t/p/w500"+data.backdrop_path;
        })
        
        this.ds.getFilmDetail(1402)
            .then( data => {
            this.photoDrama = "http://image.tmdb.org/t/p/w500"+data.backdrop_path;
        })
        
        this.ds.getFilmDetail(259316)
            .then( data => {
            this.photoFamily = "http://image.tmdb.org/t/p/w500"+data.backdrop_path;
        })
        
        this.ds.getFilmDetail(19995)
            .then( data => {
            this.photoFantasy = "http://image.tmdb.org/t/p/w500"+data.backdrop_path;
        })
        
        this.ds.getFilmDetail(72976)
            .then( data => {
            this.photoHistory = "http://image.tmdb.org/t/p/w500"+data.backdrop_path;
        })
        
        this.ds.getFilmDetail(346364)
            .then( data => {
            this.photoHorror = "http://image.tmdb.org/t/p/w500"+data.backdrop_path;
        })
        
        this.ds.getFilmDetail(1574)
            .then( data => {
            this.photoMusic = "http://image.tmdb.org/t/p/w500"+data.backdrop_path;
        })
        
        this.ds.getFilmDetail(402)
            .then( data => {
            this.photoMistery = "http://image.tmdb.org/t/p/w500"+data.backdrop_path;
        })
        
        this.ds.getFilmDetail(597)
            .then( data => {
            this.photoRomance = "http://image.tmdb.org/t/p/w500"+data.backdrop_path;
        })
        
        this.ds.getFilmDetail(157336)
            .then( data => {
            this.photoScience = "http://image.tmdb.org/t/p/w500"+data.backdrop_path;
        })
        
        this.ds.getFilmDetail(417320)
            .then( data => {
            this.photoMovie = "http://image.tmdb.org/t/p/w500"+data.backdrop_path;
        })
        
        this.ds.getFilmDetail(27205)
            .then( data => {
            this.photoThriller = "http://image.tmdb.org/t/p/w500"+data.backdrop_path;
        })
        
        this.ds.getFilmDetail(281338)
            .then( data => {
            this.photoWar = "http://image.tmdb.org/t/p/w500"+data.backdrop_path;
        })
        
        this.ds.getFilmDetail(68718)
            .then( data => {
            this.photoWestern = "http://image.tmdb.org/t/p/w500"+data.backdrop_path;
        })
    }
}
