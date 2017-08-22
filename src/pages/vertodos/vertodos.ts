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

import 'rxjs/add/operator/debounceTime';

@Component({
  selector: 'page-vertodos',
  templateUrl: 'vertodos.html',
  providers: [ MovieServiceProvider ]
})
export class VertodosPage {
  public films: any;
  public film: any;
  public filmDetail: any;
  public genreID: number;
  public filmID: number;
  public filmIMDB: string;
  public listID: string;
  private start: number = 1;
  
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
    this.listID = this.navParams.get('listID');
    //this.loadFilms();
  }
  
  goToFicha(filmID, filmIMDB){
    this.navCtrl.push(DetallePage, { filmID: filmID,  filmIMDB: filmIMDB });
  }
  
  goToVerTodos(listID) {
    this.navCtrl.push(VertodosPage, { listID: listID });
  }
  
  /*loadFilms(){
    return new Promise(resolve => {
        this.ds.getLoadFilms(this.start)
        .then(data => {
            console.log(data);
            this.filmDetail = data.results;
            this.filmDetail.forEach( (value) => {
                console.log(value);
            })
            for(let film of data) {
                this.films.push(film);
                console.log(film);
            }
            resolve(true);
        });
    });
  }
  
  doInfinite(infiniteScroll:any){
    this.start+=5;
    
    this.loadFilms().then(()=>{
        infiniteScroll.complete();
    });
  }*/

  ionViewDidLoad() {
    this.ds.getFilms(this.listID)
        .then( data => {
            this.filmDetail = data.results;
            this.filmDetail.forEach( (value) => {
                this.filmID = value.id;
                this.ds.getFilmDetail(this.filmID)
                .then( data => {
                    if(data.vote_average > 0){
                        this.films.push({
                            title: data.title,
                            id: data.id,
                            imdb_id: data.imdb_id,
                            poster_path: "http://image.tmdb.org/t/p/w500/"+data.poster_path,
                            vote_average: data.vote_average
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
        
    this.ds.getFilms2(this.listID)
        .then( data => {
            this.filmDetail = data.results;
            this.filmDetail.forEach( (value) => {
                this.filmID = value.id;
                this.ds.getFilmDetail(this.filmID)
                .then( data => {
                console.log(data);
                    if(data.vote_average > 0){
                        this.films.push({
                            title: data.title,
                            id: data.id,
                            imdb_id: data.imdb_id,
                            poster_path: "http://image.tmdb.org/t/p/w500/"+data.poster_path,
                            vote_average: data.vote_average
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
        
    this.ds.getFilms3(this.listID)
        .then( data => {
            this.filmDetail = data.results;
            this.filmDetail.forEach( (value) => {
                this.filmID = value.id;
                this.ds.getFilmDetail(this.filmID)
                .then( data => {
                console.log(data);
                    if(data.vote_average > 0){
                        this.films.push({
                            title: data.title,
                            id: data.id,
                            imdb_id: data.imdb_id,
                            poster_path: "http://image.tmdb.org/t/p/w500/"+data.poster_path,
                            vote_average: data.vote_average
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
