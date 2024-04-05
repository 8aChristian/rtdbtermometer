import { Component, OnInit } from '@angular/core';
import { Database, object, ref, update } from '@angular/fire/database';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  temperatureValue: number = 0;
  temperaturePercentage: number = 0;

  constructor(private database: Database) {}

  ngOnInit() {
    const route = ref(this.database, 'Termometro');
    object(route).subscribe((attributes) => {
      const temperature = attributes.snapshot.val();
      this.updateTemperature(temperature);
    });
  }

  updateTemperature(temperature: number) {
    this.temperatureValue = Math.round(this.convertTocelsius(temperature));
    this.temperaturePercentage = (this.temperatureValue / 100) * 100;
  }
  
  convertTocelsius(temperature: number): number {
    return Math.round((temperature * 100) / 255);
  }
}