import { Component, OnInit } from '@angular/core';
import { DatabaseService } from 'src/app/services/database.service';

@Component({
  selector: 'app-list-category',
  templateUrl: './list-category.component.html',
  styleUrls: ['./list-category.component.css']
})
export class ListCategoryComponent implements OnInit {

  constructor(private dbService: DatabaseService) {}

  // Array of category objects 
  categories: any[] = [];
  
  ngOnInit() {
    this.getCategories();
  }

  // Obtain all categories from database 
  getCategories() {
    this.dbService.getCategories().subscribe({
      next: (data: any) => {
        this.categories = data;
      },
      error: (error) => {console.log(error)}
    }); 
  }
}
