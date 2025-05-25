import { Component } from '@angular/core';
import { DatabaseService } from 'src/app/services/database.service';

@Component({
  selector: 'app-stats-g2',
  templateUrl: './stats-g2.component.html',
  styleUrls: ['./stats-g2.component.css']
})
export class StatsG2Component {

  records: any[] = [];

  constructor(private dbService: DatabaseService) {
    this.getOperations();
  }
  getOperations() {
    this.dbService.getStats().subscribe({
      next: (data: any) => {
        this.records = data;
      },
      error: (error) => {console.log(error)}
    }); 
  }
}
