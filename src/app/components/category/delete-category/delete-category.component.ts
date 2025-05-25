import { Component, OnInit } from '@angular/core';
import { DatabaseService } from 'src/app/services/database.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-delete-category',
  templateUrl: './delete-category.component.html',
  styleUrls: ['./delete-category.component.css']
})
export class DeleteCategoryComponent implements OnInit {

  categories: any[] = [];

  constructor(private dbService: DatabaseService, private router: Router) {}

  // To obtain all categories
  onGetCategories() {
    return this.dbService.getCategories().subscribe({
      next: (result: any) => {
        this.categories = result;
      }, 
      error: (error) => {
        console.log(error);
        this.router.navigate(['invalid-data']);
      }
    });
  }

  // Delete the category
  onDeleteCategory(category: any) {
    // First, obtain all categories from database 
    this.onGetCategories();

    // Perform the delete
    this.dbService.deleteCategory(category).subscribe({
      next: (result) => {
        // Navigate to list-category page after deleting category
        this.router.navigate(["api/v1/category/32693974/list-category"]);
      },
      // Navigate to error page if error is returned
      error: (error) => {
        console.log(error.error);
        this.router.navigate(["invalid-data"]);
      }
    });
  }

  // This callback function will be invoked with the component get initialized by Angular 
  ngOnInit() {
    this.onGetCategories();
  }
}
