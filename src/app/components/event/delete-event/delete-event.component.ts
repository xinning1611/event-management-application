import { Component } from '@angular/core';
import { DatabaseService } from 'src/app/services/database.service';

@Component({
  selector: 'app-delete-event',
  templateUrl: './delete-event.component.html',
  styleUrls: ['./delete-event.component.css']
})
export class DeleteEventComponent {

  records: any[] = [];

  constructor(private dbService: DatabaseService) {
    this.getEvents();
  }

  getEvents() {
    this.dbService.getEvents().subscribe({
      next: (data: any) => {
        this.records = data;
      },
      error: (error) => {console.log(error)}
    }); 
  }

  onDeleteEvent(event: any){
    console.log(event);
    this.dbService.deleteEvent(event).subscribe({
      next: () => {
          console.log('Event deleted successfully');
          this.getEvents();
      },
      error: (error) => {console.log(error)}
  });
  }
}
