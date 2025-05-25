import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DatabaseService } from 'src/app/services/database.service';

@Component({
  selector: 'app-category-details',
  templateUrl: './category-details.component.html',
  styleUrls: ['./category-details.component.css']
})

export class CategoryDetailsComponent {

  categoryId: string | null = "";
  categories: any[] = [];
  category: any = {};

  constructor(private route: ActivatedRoute, private dbService: DatabaseService) {
    // Retrieve the category ID from URL parameter 
    this.route.paramMap.subscribe(params => {
      this.categoryId = params.get('categoryId');
    })
  }

  ngOnInit() {
    this.getCategories();
  }

  // Obtain all categories
  getCategories(){
    this.dbService.getCategories().subscribe(
      {
        next: (data: any) => {
          this.categories = data;
          console.log(this.categories);
          this.getCategory();
        },
        error: (error) => {console.log(error)}
      }
    );
  }

  // To get the selected category using category ID 
  getCategory(){
    console.log(this.categories);
    console.log(this.categoryId);
    for (const category of this.categories){
      if (category.categoryId === this.categoryId){
        this.category = category;
        console.log(this.category);
      }
    }
  }
}
