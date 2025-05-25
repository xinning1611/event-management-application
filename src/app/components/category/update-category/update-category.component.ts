import { Component, OnInit } from '@angular/core';
import { DatabaseService } from 'src/app/services/database.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-update-category',
  templateUrl: './update-category.component.html',
  styleUrls: ['./update-category.component.css']
})
export class UpdateCategoryComponent implements OnInit {
  name: string = "";
  description: string = "";
  image: string = "";
  categoryId: string = "";

  categories: any[] = [];

  constructor(private dbService: DatabaseService, private router: Router) {}

  ngOnInit() {
    this.onGetCategories();
  }

  // To obtain all categories
  onGetCategories() {
    return this.dbService.getCategories().subscribe({
      next: (result: any) => {
        this.categories = result;
      }, 
      error: (error) => {console.log(error)}
    });
  }

  // Update the category
  onSelectCategory(category: any) {
    this.categoryId = category.categoryId;
    this.name = category.name;
    this.description = category.description;
    this.image = category.image;
  }

  // Perform update 
  onUpdateCategory() {
    let obj = { categoryId: this.categoryId, name: this.name, description: this.description, image: this.image };
    console.log(obj);
    this.dbService.updateCategory(obj).subscribe({
      next: (result) => {
        this.onGetCategories();
        // Navigate to list-category after updating
        this.router.navigate(["api/v1/category/32693974/list-category"]);
      },
      error: (error) => {
        console.log(error.error);
        this.router.navigate(["invalid-data"]);
      }
    });
  }

}
