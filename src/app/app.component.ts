import { Component, OnInit } from '@angular/core';
import { DatabaseService } from './services/database.service';

interface ICategory {
  name: string;
  description: string;
  image: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'emaAngular';

  // constructor (private dbService: DatabaseService) {}

  // ngOnInit(): void {
  //   this.getCategories(); 
  // }

  // category: ICategory = {
  //   name: '',
  //   description: '',
  //   image: '',
  // };

  // categories: ICategory[] = [];

  // getCategories() {
  //   this.dbService.getCategories().subscribe((categories: any) => {
  //     this.categories = categories;
  //   })
  // }

}
