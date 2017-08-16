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
  icons: string[];
  items: Array<{title: string, note: string, icon: string}>;
  public films: any;
  public filmDetail: any;
  public genreID: number;
  public filmID: number;
  public genreFilms: any;
  public photo: any;
  iconGenres: Array<{icon: string}>;

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
    this.iconGenres = [
        { icon: 'star' },
        { icon: 'leaf' },
        { icon: 'home' },
        { icon: 'happy' },
        { icon: 'home' },
        { icon: 'videocamera' },
        { icon: 'home' },
        { icon: 'home' },
        { icon: 'home' },
        { icon: 'home' },
        { icon: 'home' },
        { icon: 'music-note' },
        { icon: 'home' },
        { icon: 'heart' },
        { icon: 'planet' },
        { icon: 'home' },
        { icon: 'home' },
        { icon: 'jet' },
        { icon: 'home' }
    ];
    this.genreID = this.navParams.get('genreID');
    //this.loader = this.loadingCtrl.create();
  }
  
  goToListaPelis(genreID) {
    this.navCtrl.push(ListapelisPage, { genreID: genreID });
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
                    this.photo.push({
                        photo: "http://image.tmdb.org/t/p/w500"+data.results[0].backdrop_path
                    })
                    this.filmDetail.forEach( (value) => {
                        this.filmID = value.id;
                        this.ds.getFilmDetail(this.filmID)
                        .then( data => {
                            this.films.push({
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
}
