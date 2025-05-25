import { Component } from '@angular/core';
import { DatabaseService } from 'src/app/services/database.service';

@Component({
  selector: 'app-stats-g1',
  templateUrl: './stats-g1.component.html',
  styleUrls: ['./stats-g1.component.css']
})
export class StatsG1Component {

  records: any[] = [];

  constructor(private dbService: DatabaseService) {
    this.getOperations();
  }

  // To get the records
  getOperations() {
    this.dbService.getStats().subscribe({
      next: (data: any) => {
        this.records = data;
      },
      error: (error) => {console.log(error)}
    }); 
  }

}
