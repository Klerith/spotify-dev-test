import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, URLSearchParams } from '@angular/http'
import 'rxjs/add/operator/map';

@Injectable()
export class SpotifyService {

  private _token:string="";
  private token_valido:boolean = false;


  artistas:any [] = [];

  urlBusqueda:string = "https://api.spotify.com/v1/search";
  urlArtista:string = "https://api.spotify.com/v1/artists";
  urlToken:string = "https://accounts.spotify.com/api/token";


  constructor( private http:Http ) {
    // this.get_headers();
    this.verifica_token();
  }

  private verifica_token(){

    let ahora = new Date();
    localStorage.setItem( "hora_token", ahora.getTime().toString() );

    if( localStorage.getItem("hora_token") ){
      // Si existe el token hay que verificar que aún sea válido
      let horaToken = new Date();
      horaToken.setTime( Number(localStorage.getItem("hora_token")) );

      horaToken.setHours( 1 );

      if( horaToken >= new Date() ){
        console.log("Token Válido");
        this.token_valido = true;
        this._token = localStorage.getItem("token");
      }else{
        console.log("Token Inválido");

        // Headers
        let post_data:any = {
          'grant_type':'client_credentials',
          'client_id':'83d3310e5cdc466891e0adb7e2bf67d1',
          'client_secret':'720cc51a9b7e4623b90d3ff9e0a57203'
        };

        // let headers = new Headers({
        //   "Content-Type": "application/x-www-form-urlencoded",
        //   "cache-control": "no-cache"
        // });
        let headers = new Headers();
         headers.append('Authorization', 'Basic ' + btoa('83d3310e5cdc466891e0adb7e2bf67d1' + ':' + '720cc51a9b7e4623b90d3ff9e0a57203'));
         headers.append('Content-Type', 'application/x-www-form-urlencoded');

        let body = new URLSearchParams();
        body.append('grant_type','client_credentials');
        body.append('client_id','83d3310e5cdc466891e0adb7e2bf67d1');
        body.append('client_secret','720cc51a9b7e4623b90d3ff9e0a57203');

        console.log( body.toString() );
        // let data = "grant_type=client_credentials&client_id=83d3310e5cdc466891e0adb7e2bf67d1&client_secret=720cc51a9b7e4623b90d3ff9e0a57203";


        this.http.post( this.urlToken, body.toString() , { headers } )
              .subscribe( data=>{
                console.log(data);
          });

        // let headers = new Headers();
        // headers.append('authorization', 'Bearer BQCa9_PX-nSbAQ86h142kbets_EhT5Uo7POKcfOhqRRKtFLyb4KfA0ah93VhUqFM-vLYSjbWJgFpxE9oGicPFA');

      }

    }else{
      return "0";
    }

  }

  private get_headers(){
    // console.log("get headers llamado");
    // let inicio = new Date();
    // console.log(inicio);
    //
    // // inicio.setSeconds( inicio.getSeconds() + 3600  );
    //
    // // console.log( inicio );
    //
    // if( new Date() <= inicio  ){
    //   console.log("Token valido");
    // }else{
    //   console.log("El token ya no es válido");
    // }


  }


  getArtistas( termino:string ){

    let headers = new Headers();
    headers.append('authorization', 'Bearer BQCa9_PX-nSbAQ86h142kbets_EhT5Uo7POKcfOhqRRKtFLyb4KfA0ah93VhUqFM-vLYSjbWJgFpxE9oGicPFA');


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
