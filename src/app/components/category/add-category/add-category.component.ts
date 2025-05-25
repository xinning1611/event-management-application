import { Component, OnInit } from '@angular/core';
import { DatabaseService } from 'src/app/services/database.service';
import { Router } from '@angular/router';

interface ICategory {
  name: string; 
  description: string;
  image: string;
};

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css']
})
export class AddCategoryComponent implements OnInit {

  constructor(private dbService: DatabaseService, private router: Router) { }

  ngOnInit() : void {
  }

  category: ICategory = {
    name: "", 
    description: "",
    image: ""  
  }; 

  onSaveCategory(){
    // Create a new category with user input data 
    let newCategory = { 
      name: this.category.name, 
      description: this.category.description, 
      image: this.category.image ? this.category.image : 'category-page.png' 
    }; 
    console.log(newCategory);

    // Add the new category into database 
    this.dbService.addCategory(newCategory).subscribe({
      next: (result) => {
        this.router.navigate(["api/v1/category/32693974/list-category"]);
      },

      // Navigate to invalid-data page if error occurrs 
      error: (error) => {
        console.log(error.error);
        this.router.navigate(["invalid-data"]);
      }
    });
  }
}
