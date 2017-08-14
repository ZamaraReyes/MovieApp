import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { FormControl } from '@angular/forms';

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
  searchTerm: string = '';
  searchControl: FormControl;
  searching: any = false;
  
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
    this.searchControl = new FormControl();
    
    /*this.ds.getFilms(this.listID)
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
        })*/
  }
  
  goToFicha(filmID, filmIMDB){
    this.navCtrl.push(DetallePage, { filmID: filmID,  filmIMDB: filmIMDB });
  }
  
  goToVerTodos(listID) {
    this.navCtrl.push(VertodosPage, { listID: listID });
  }
  
    onSearchInput(){
        this.searching = true;
    }
    
    /*setFilteredItems() {
 
        this.films = this.filterItems(this.searchTerm);
 
    }
    
    filterItems(searchTerm){

        return this.films = this.films.filter( (film) => {
            return this.film.title.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1; 
        });
    }*/

  ionViewDidLoad() {
    //this.setFilteredItems();
    /*this.searchControl.valueChanges.debounceTime(700).subscribe(search => {
 
            this.searching = false;
            return this.films = this.films.filter( (film) => {
                return this.film.title.toLowerCase().indexOf(this.searchTerm.toLowerCase()) > -1; 
            });
 
        });*/
    this.ds.getFilms(this.listID)
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
                    console.log(this.films.title)
                    this.searchControl.valueChanges.debounceTime(700).subscribe(search => {
 
                        this.searching = false;
                        this.films = this.films.filter( (film) => {
                            return this.film.title.toLowerCase().indexOf(this.searchTerm.toLowerCase()) > -1; 
                        });

                    });
                    console.log(data);
                })
                console.log(this.films.title)
                
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
