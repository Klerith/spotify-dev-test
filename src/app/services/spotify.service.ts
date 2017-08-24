import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, URLSearchParams } from '@angular/http'
import 'rxjs/add/operator/map';

@Injectable()
export class SpotifyService {

  private token_valido:boolean = false;


  artistas:any [] = [];

  urlBusqueda:string = "https://api.spotify.com/v1/search";
  urlArtista:string = "https://api.spotify.com/v1/artists";
  urlToken:string = "https://accounts.spotify.com/api/token";


  constructor( private http:Http ) {
  }



  getArtistas( termino:string ){

    let headers = new Headers();
    headers.append('authorization', 'Bearer BQAaG9t7nFY33s-1MkOdHwNqXmXHsfaH2excJARPo9oKQQ2nrFHoo72go0Ta5oXafvVbCk9Nta168wJExSHs1A');


    let query = `?q=${ termino }&type=artist`;
    let url = this.urlBusqueda + query;

    return this.http.get( url, { headers } )
            .map( res =>{
                // console.log(res.json().artists.items  );
                this.artistas = res.json().artists.items;
                console.log(this.artistas);
                // return res.json().artists.items;
            })

  }

  getArtista( id:string ){

    let query = `/${ id }`;
    let url = this.urlArtista + query;

    return this.http.get( url )
            .map( res =>{
                console.log( res.json()  );
                return res.json();
            })

  }

  getTop( id:string ){

    let query = `/${ id }/top-tracks?country=US`;
    let url = this.urlArtista + query;

    return this.http.get( url )
            .map( res =>{
                console.log( res.json().tracks  );
                return res.json().tracks;
            })

  }


}
