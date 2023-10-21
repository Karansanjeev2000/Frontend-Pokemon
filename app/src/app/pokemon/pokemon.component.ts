// pokemon.component.ts
import { Component, OnInit } from "@angular/core";
import { PokemonService } from "../pokemonservices.service";
import { MatDialog } from "@angular/material/dialog";
import { PokemonDetailsComponent } from "../pokemon-details/pokemon-details.component";

@Component({
  selector: 'app-pokemon',
  templateUrl: './pokemon.component.html',
  styleUrls: ['./pokemon.component.css']
})
export class PokemonComponent implements OnInit {
  pokemonData: any[] = [];
  displayedPokemon: any[] = [];
  itemsPerPage: number = 12;
  currentPage: number = 1;

  constructor(private pokemonService: PokemonService,private dialog:MatDialog) {}

  ngOnInit() {
    this.fetchPokemons(); // Fetch initial data
  }

  fetchPokemons() {
    const numberOfPokemons = 100;
    for (let id = 1; id <= numberOfPokemons; id++) {
      this.pokemonService.getPokemonData(id).subscribe((data: any) => {
        this.pokemonData.push(data);
        console.log(data);
        this.loadInitialData(); 

      });
    }
  }

  loadInitialData() {
    const endIndex = this.itemsPerPage;
    this.displayedPokemon = this.pokemonData.slice(0, endIndex);
  }

  loadMoreData() {
    const startIndex = this.displayedPokemon.length;
    const endIndex = startIndex + this.itemsPerPage;
    const newPokemon = this.pokemonData.slice(startIndex, endIndex);
    this.displayedPokemon = [...this.displayedPokemon, ...newPokemon];
  }

  onClickFunction(){this.dialog.open(PokemonDetailsComponent); }
}
