import { Component, OnInit } from '@angular/core';
import { StatsService } from '@services/data/stats.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  numActiveUser: number | string = '...';

  constructor(private statsService: StatsService) {}

  ngOnInit(): void {
    this.statsService.getActiveUsers()
      .then(value => this.numActiveUser = value)
      .catch(error => {
        console.error('Error in HomeComponent:', error);
        this.numActiveUser = 'Error';
      });
  }
}
