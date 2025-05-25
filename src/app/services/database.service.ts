import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";

const httpOptions = {
  headers: new HttpHeaders({ "Content-Type": "application/json" }),
};

@Injectable({
  providedIn: 'root'
})

export class DatabaseService {

  constructor(private http: HttpClient) { }

  getCategories() {
    return this.http.get("/api/v1/category/32693974/list-category");
  }
  addCategory(data: any) {
    return this.http.post("/api/v1/category/32693974/add-category", data, httpOptions);
  }
  updateCategory(data: any) {
    return this.http.put("/api/v1/category/32693974/update-category", data, httpOptions);
  }
  deleteCategory(data: any) {
    const options = {
      body: data,
    }
    return this.http.delete("/api/v1/category/32693974/delete-category", options);
  }

  getEvents(){
    return this.http.get("/list-events");
  }
  addEvent(data: any){
    return this.http.post("/add-event", data, httpOptions);
  }
  updateEvent(data: any){
    return this.http.put("/update-event", data, httpOptions);
  }
  deleteEvent(data: any){
    const options = {
      body: data,
    };
    return this.http.delete("/delete-event", options);
  }
  getStats(){
    return this.http.get("/stats");
  }
}
