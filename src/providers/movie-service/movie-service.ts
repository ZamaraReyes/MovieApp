import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

import { Observable } from "rxjs/Rx";
import 'rxjs/add/observable/merge';


@Injectable()
export class MovieServiceProvider {
    public film: any;
    public films: any;
    
  constructor(
    public http: Http
  ) {
    this.film = [];
    this.films = [];
  }
  
  getFilms(listID){
    return this.http.get('https://api.themoviedb.org/3/movie/'+listID+'?api_key=d59205b54cbec181f81ddd43001c619b&language=en-US&page=1')
        .map( res => res.json() )
        .toPromise();
    }
    
    getFilmsBest(){
        return this.http.get('https://api.themoviedb.org/3/movie/top_rated?api_key=d59205b54cbec181f81ddd43001c619b&language=en-US&page=1')
            .map( res => res.json() )
            .toPromise();
    }
    
    getFilmsPopular(){
        return this.http.get('https://api.themoviedb.org/3/movie/popular?api_key=d59205b54cbec181f81ddd43001c619b&language=en-US&page=1')
            .map( res => res.json() )
            .toPromise();
    }
    
    getFilmsComing(){
        return this.http.get('https://api.themoviedb.org/3/movie/upcoming?api_key=d59205b54cbec181f81ddd43001c619b&language=en-US&page=1')
            .map( res => res.json() )
            .toPromise();
    }
    
    getListGenres(){
        return this.http.get('https://api.themoviedb.org/3/genre/movie/list?api_key=d59205b54cbec181f81ddd43001c619b&language=en-US')
        .map( res => res.json() )
        .toPromise();
    }
    
    getListFilms(genreID){
        return this.http.get('https://api.themoviedb.org/3/genre/'+genreID+'/movies?api_key=d59205b54cbec181f81ddd43001c619b&language=en-US&include_adult=false&sort_by=created_at.asc')
        .map( res => res.json() )
        .toPromise();
    }
    
    getFilmDetail(filmID){
        return this.http.get('https://api.themoviedb.org/3/movie/'+filmID+'?api_key=d59205b54cbec181f81ddd43001c619b&language=en-US')
        .map( res => res.json() )
        .toPromise();
    }
    
    getFilmSimilar(filmID){
        return this.http.get('https://api.themoviedb.org/3/movie/'+filmID+'/similar?api_key=d59205b54cbec181f81ddd43001c619b&language=en-US')
        .map( res => res.json() )
        .toPromise();
    }
    
    getFilmVideo(filmID){
        return this.http.get('https://api.themoviedb.org/3/movie/'+filmID+'/videos?api_key=d59205b54cbec181f81ddd43001c619b&language=en-US')
        .map( res => res.json() )
        .toPromise();
    }
    
    getFilmSearch(film){
        return this.http.get('https://api.themoviedb.org/3/search/movie?api_key=d59205b54cbec181f81ddd43001c619b&query='+film)
        .map( res => res.json() )
        .toPromise();
    }
    
    getFilmVotes(filmIMDB){
        return this.http.get('https://omdbapi.com?i='+filmIMDB+'&apikey=3370463f')
        .map( res => res.json() )
        .toPromise();
    }
    
    /*filterItems(searchTerm){

        return this.films.filter((film) => {
            return this.film.title.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1;
        });      
    }*/
}
