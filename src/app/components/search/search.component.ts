import { Component, OnInit } from '@angular/core';
import { SpotifyService } from '../../services/spotify.service';


@Component({
  selector: 'app-search',
  templateUrl: './search.component.html'
})
export class SearchComponent implements OnInit {

  termino:string = "";

  constructor( public _spotifyService:SpotifyService ) { }

  ngOnInit() {}

  buscarArtista(){
    this._spotifyService.getArtistas( this.termino )
      .subscribe();
  }


}
