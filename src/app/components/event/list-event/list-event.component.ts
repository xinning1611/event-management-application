import { Component } from '@angular/core';
import { DatabaseService } from 'src/app/services/database.service';

@Component({
  selector: 'app-list-event',
  templateUrl: './list-event.component.html',
  styleUrls: ['./list-event.component.css']
})
export class ListEventComponent {

  records: any[] = [];

  constructor(private dbService: DatabaseService) {
    this.getEvents();
  }

  getEvents() {
    this.dbService.getEvents().subscribe({
      next: (data: any) => {
        this.records = data;
      },
      error: (error) => {console.log(error);}
    }); 
  }
}
