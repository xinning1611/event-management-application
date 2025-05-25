import { Component } from '@angular/core';
import { DatabaseService } from 'src/app/services/database.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-update-event',
  templateUrl: './update-event.component.html',
  styleUrls: ['./update-event.component.css']
})
export class UpdateEventComponent {

  name: string = "";
  capacity: number = 0;
  eventId: string = "";

  records: any[] = [];

  constructor(private dbService: DatabaseService, private router: Router) {
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

  onUpdateEvent(){
    let event = {eventId: this.eventId, name: this.name, capacity: this.capacity};
    this.dbService.updateEvent(event).subscribe({
      next: () => {
          console.log('Event updated successfully');
          this.getEvents();
          this.router.navigate(['/list-events']);
      },
      error: (error) => {
        this.router.navigate(["invalid-data"]);
      }
    });
  }

  onSelectEvent(event: any) {
    this.eventId = event.eventId;
    this.name = event.name;
    this.capacity = event.capacity;
  }

}
