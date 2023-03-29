import { Component } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { PlayersService } from '../services/players.service';
import { Player } from 'src/app/models/player';
import { Router } from '@angular/router';
import { FormControl } from '@angular/forms';

interface DropdownItem {
  name: string;
  id: string;
}

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})


export class HomepageComponent {

  selectedCountryFormControl = new FormControl('');
  selectedPositionFormControl = new FormControl('');
  allPlayers: Player[] = [];
  players: Player[] = [];
  countries: DropdownItem[] = [];
  countriesArr: string[] = ["All countries"];
  countrySelected: string = "All countries";
  positions: DropdownItem[] = [];
  positionsArr: string[] = ["All positions"];
  positionSelected: string = "All positions";

  constructor(private playersService: PlayersService, private router: Router) {
  }

  async ngOnInit(): Promise<void> {
    let p: Player[] = await firstValueFrom(this.playersService.getPlayers());
    // let p: Player[] = [{ playerName: "Emilio Ferrer", primaryPositionName: "Delantero", dob: "28/03/2023", heightInches: 185, weight: 80, birthCountry: "USA", birthCity: "Barcelona", birthStateProvince: "Prueba", mlbDebutDate: "28/03/2023", playerForTestSetAndFuturePreds: true, playerId: "672779", primaryPositionCode: "GK" }, { playerName: "Emilio Ferrer", primaryPositionName: "Goalkeeper", dob: "28/03/2023", heightInches: 185, weight: 80, birthCountry: "USA", birthCity: "Barcelona", birthStateProvince: "Prueba", mlbDebutDate: "28/03/2023", playerForTestSetAndFuturePreds: true, playerId: "672779", primaryPositionCode: "GK" }, { playerName: "Emilio Ferrer", primaryPositionName: "Goalkeeper", dob: "28/03/2023", heightInches: 185, weight: 80, birthCountry: "USA", birthCity: "Barcelona", birthStateProvince: "Prueba", mlbDebutDate: "28/03/2023", playerForTestSetAndFuturePreds: true, playerId: "672779", primaryPositionCode: "GK" }, { playerName: "Emilio Ferrer", primaryPositionName: "Goalkeeper", dob: "28/03/2023", heightInches: 185, weight: 80, birthCountry: "Venezuela", birthCity: "Barcelona", birthStateProvince: "Prueba", mlbDebutDate: "28/03/2023", playerForTestSetAndFuturePreds: true, playerId: "672779", primaryPositionCode: "GK" }, { playerName: "Emilio Ferrer", primaryPositionName: "Goalkeeper", dob: "28/03/2023", heightInches: 185, weight: 80, birthCountry: "Spain", birthCity: "Barcelona", birthStateProvince: "Prueba", mlbDebutDate: "28/03/2023", playerForTestSetAndFuturePreds: true, playerId: "672779", primaryPositionCode: "GK" }, { playerName: "Emilio Ferrer", primaryPositionName: "Goalkeeper", dob: "28/03/2023", heightInches: 185, weight: 80, birthCountry: "Spain", birthCity: "Barcelona", birthStateProvince: "Prueba", mlbDebutDate: "28/03/2023", playerForTestSetAndFuturePreds: true, playerId: "672779", primaryPositionCode: "GK" }, { playerName: "Emilio Ferrer", primaryPositionName: "Goalkeeper", dob: "28/03/2023", heightInches: 185, weight: 80, birthCountry: "Spain", birthCity: "Barcelona", birthStateProvince: "Prueba", mlbDebutDate: "28/03/2023", playerForTestSetAndFuturePreds: true, playerId: "672779", primaryPositionCode: "GK" }];
    this.players = p;
    this.allPlayers = p;
    this.players.forEach(player => {
      this.countriesArr.push(player.birthCountry);
      this.positionsArr.push(player.primaryPositionName);
    });
    this.countriesArr = this.countriesArr.filter((element, index) => {
      return this.countriesArr.indexOf(element) === index;
    });
    this.positionsArr = this.positionsArr.filter((element, index) => {
      return this.positionsArr.indexOf(element) === index;
    });

    this.countriesArr.forEach(country => {
      this.countries.push({ name: country, id: country });
    });
    this.positionsArr.forEach(position => {
      this.positions.push({ name: position, id: position });
    });


  }

  filterByCountry() {
    if (this.selectedCountryFormControl.value !== "All countries" && this.selectedCountryFormControl.value !== "") {
      this.countrySelected = this.selectedCountryFormControl.value as string;
      this.players = this.players.filter(player => player.birthCountry === this.countrySelected);
    }
  }

  filterByPosition() {
    if (this.selectedPositionFormControl.value !== "All positions" && this.selectedPositionFormControl.value !== "") {
      this.positionSelected = this.selectedPositionFormControl.value as string;
      this.players = this.players.filter(player => player.primaryPositionName === this.positionSelected);
    }
  }

  filter() {
    this.players = this.allPlayers;
    this.filterByCountry();
    this.filterByPosition();
  }

  goDetails(id: string) {
    try {
      this.router.navigate([`/main/${id}`]);
    } catch (error) {
      console.log(error);
    }
  }
}
