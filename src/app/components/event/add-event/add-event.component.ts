import { Component } from '@angular/core';
import { DatabaseService } from 'src/app/services/database.service';
import { Router } from '@angular/router';


interface Event{
  name: string;
  description: string;
  startDateTime: Date;
  durationInMinutes: number;
  active: Boolean;
  image: string | null;
  capacity: number | null;
  ticketsAvailable: number | null;
  categoryList: string;
}

@Component({
  selector: 'app-add-event',
  templateUrl: './add-event.component.html',
  styleUrls: ['./add-event.component.css']
})
export class AddEventComponent {

  constructor(private dbService: DatabaseService, private router: Router) { }

  event: Event = {
    name: "",
    description: "",
    startDateTime: new Date(),
    durationInMinutes: 0,
    active: true,
    image: null,
    capacity: null,
    ticketsAvailable: null,
    categoryList: "",
  }

  onSaveEvent(){
    if (this.event.image === null){
      this.event.image = "private-event.png";
    }
    if (this.event.capacity === null){
      this.event.capacity = 1000;
    }
    if (this.event.ticketsAvailable === null){
      this.event.ticketsAvailable = this.event.capacity;
    }
    let newEvent = {
      name: this.event.name,
      description: this.event.description,
      startDateTime: this.event.startDateTime,
      durationInMinutes: this.event.durationInMinutes,
      active: this.event.active,
      image: this.event.image,
      capacity: this.event.capacity,
      ticketsAvailable: this.event.ticketsAvailable,
      categoryList: this.event.categoryList,
    }
    
    this.dbService.addEvent(newEvent).subscribe({
      next: (result) => {this.router.navigate(["/list-events"])},
      error: (error) => {
        this.router.navigate(["invalid-data"]);
      }
    }); 
  }

}
