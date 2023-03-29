import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { PlayersService } from '../services/players.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent {
  form: FormGroup;

  constructor(private playersService: PlayersService) {
    this.form = new FormGroup({
      playerId: new FormControl(), 
      playerName: new FormControl(), 
      DOB: new FormControl(), 
      mlbDebutDate: new FormControl(), 
      birthCity: new FormControl(), 
      birthStateProvince: new FormControl(), 
      birthCountry: new FormControl(), 
      heightInches: new FormControl(), 
      weight: new FormControl(), 
      primaryPositionCode: new FormControl(), 
      primaryPositionName: new FormControl(), 
      playerForTestSetAndFuturePreds: new FormControl()
    });
  }

  async onSubmit() {
    console.log(this.form.value)
    const response = await this.playersService.addPlayer(this.form.value);
    console.log(response);
    this.form.reset();
  }
}
