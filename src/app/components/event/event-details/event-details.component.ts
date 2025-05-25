import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DatabaseService } from 'src/app/services/database.service';

@Component({
  selector: 'app-event-details',
  templateUrl: './event-details.component.html',
  styleUrls: ['./event-details.component.css']
})
export class EventDetailsComponent {
  eventsList: any[] = [];
  eventId: string | null= "";
  event: any = {};

  constructor(private dbService: DatabaseService, private route: ActivatedRoute) {
    this.route.paramMap.subscribe(params => {
      // Use eventId to fetch or display event details
      this.eventId = params.get('eventId');
    });
  }

  ngOnInit(): void{
    this.getEvents();
    
  }

  getEvents(){
    this.dbService.getEvents().subscribe(
      {
        next: (data: any) => {
          this.eventsList = data;
          console.log(this.eventsList);
          this.getEvent();
        },
        error: (error) => {console.log(error)}
      }
    );
  }
  getEvent(){
    console.log(this.eventsList);
    console.log(this.eventId);
    for (const event of this.eventsList){
      if (event.eventId == this.eventId){
        this.event = event;
        console.log(this.event);
      }
    }
  }
}
