import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';


@Injectable()
export class MovieServiceProvider {
    public film: any;
    public films: any;
    public listID: string;
    perpage: number = 5;
    
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
    
  getFilms2(listID){
    return this.http.get('https://api.themoviedb.org/3/movie/'+listID+'?api_key=d59205b54cbec181f81ddd43001c619b&language=en-US&page=2')
        .map( res => res.json() )
        .toPromise();
    }
    
  getFilms3(listID){
    return this.http.get('https://api.themoviedb.org/3/movie/'+listID+'?api_key=d59205b54cbec181f81ddd43001c619b&language=en-US&page=3')
        .map( res => res.json() )
        .toPromise();
    }
    
    /*getLoadFilms(start:number=1){
    return new Promise(resolve => {
        this.http.get('https://api.themoviedb.org/3/movie/upcoming?api_key=d59205b54cbec181f81ddd43001c619b&language=en-US&page='+start)
            .map( res => res.json() )
            .subscribe(data => {
                resolve(data);
            });
        });
    }*/
    
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
    
    getFilmsPlaying(){
        return this.http.get('https://api.themoviedb.org/3/movie/now_playing?api_key=d59205b54cbec181f81ddd43001c619b&language=en-US&page=1')
            .map( res => res.json() )
            .toPromise();
    }
    
    getAllFilms(){
        return this.http.get('https://api.themoviedb.org/3/discover/movie?api_key=d59205b54cbec181f81ddd43001c619b&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&primary_release_date.gte=2000&primary_release_date.lte=2017')
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
    
    getListFilms2(genreID){
        return this.http.get('https://api.themoviedb.org/3/genre/'+genreID+'/movies?page=2&api_key=d59205b54cbec181f81ddd43001c619b&language=en-US&include_adult=false&sort_by=created_at.asc')
        .map( res => res.json() )
        .toPromise();
    }
    
    getListFilms3(genreID){
        return this.http.get('https://api.themoviedb.org/3/genre/'+genreID+'/movies?page=3&api_key=d59205b54cbec181f81ddd43001c619b&language=en-US&include_adult=false&sort_by=created_at.asc')
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
}
