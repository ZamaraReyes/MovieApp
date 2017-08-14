import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';
import { Http } from '@angular/http';
import { NgStyle } from '@angular/common';
import { DomSanitizer, SafeUrl, SafeResourceUrl} from '@angular/platform-browser';

import {
    MovieServiceProvider
    }
    from '../../providers/movie-service/movie-service';

import { Observable } from "rxjs/Rx";
import 'rxjs/add/observable/merge';


@Component({
  selector: 'page-detalle',
  templateUrl: 'detalle.html',
  providers: [ MovieServiceProvider ]
})
export class DetallePage {
    public film: any;
    public filmDetail: any;
    public similarFilms: any;
    public films: any;
    public filmID: number;
    public votes: any;
    public filmIMDB: string;
    public videoUrl: string;
    public photo: string;
    
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public ds: MovieServiceProvider,
    public http: Http,
    private sanitizer: DomSanitizer,
    public viewCtrl:  ViewController
  ) {
    this.film = [];
    this.filmID = this.navParams.get('filmID');
    this.votes = [];
    this.filmDetail = [];
    this.similarFilms = [];
    this.filmIMDB = this.navParams.get('filmIMDB');
    this.photo;
    this.videoUrl;
  }
  
  goToFicha(filmID, filmIMDB){
    this.navCtrl.push(DetallePage, { filmID: filmID,  filmIMDB: filmIMDB });
  }

  ionViewDidLoad() {
    this.ds.getFilmDetail(this.filmID)
        .then( data => {
            this.film = data;
            this.photo = "http://image.tmdb.org/t/p/w500"+data.backdrop_path;
        })
        .catch(error => {
            console.error(error);
        })
    
    this.ds.getFilmVotes(this.filmIMDB)
        .then( data => {
            this.votes = data;
        })
        .catch(error => {
            console.error(error);
        })
        
    this.ds.getFilmSimilar(this.filmID)
        .then( data => {
            console.log(data.results);
            this.filmDetail = data.results;
            this.filmDetail.forEach( (value) => {
                this.filmID = value.id;
                this.ds.getFilmDetail(this.filmID)
                .then( data => {
                    this.similarFilms.push({
                        id: data.id,
                        imdb_id: data.imdb_id,
                        poster_path: "http://image.tmdb.org/t/p/w500"+data.poster_path
                    });
                })
                .catch(error => {
                    console.error(error);
                })
            })
        })
        .catch(error => {
            console.error(error);
        })
        
        this.ds.getFilmVideo(this.filmID)
            .then( data => {
            console.log(data);
                if(data.results.length > 0) {
                    this.videoUrl = "https://www.youtube.com/embed/"+data.results[0].key;
                } else if(data.results.length < 0){
                    this.videoUrl = "https://www.youtube.com/embed/";
                }
                
            })
            .catch(error => {
                console.error(error);
            })
    }
  
  close(){
    this.viewCtrl.dismiss({ retornar: "parametros al padre" });
  }
  
}