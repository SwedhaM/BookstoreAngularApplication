// import { Injectable } from '@angular/core';
// import { BehaviorSubject } from 'rxjs';

// @Injectable({
//   providedIn: 'root'
// })
// export class BookService {
//   private categories: BehaviorSubject<string[]> = new BehaviorSubject<string[]>([]);
//   private selectedCategory: BehaviorSubject<string> = new BehaviorSubject<string>('');

//   get categories$() {
//     return this.categories.asObservable();
//   }

//   get selectedCategory$() {
//     return this.selectedCategory.asObservable();
//   }

//   setCategories(categories: string[]) {
//     this.categories.next(categories);
//   }

//   setSelectedCategory(category: string) {
//     this.selectedCategory.next(category);
//   }

//   filterByCategory(category: string) {
//     this.setSelectedCategory(category);
//   }
// }


import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class BookService {
  private categories: BehaviorSubject<string[]> = new BehaviorSubject<string[]>([]);
  private selectedCategory: BehaviorSubject<string> = new BehaviorSubject<string>('');

  get categories$() {
    return this.categories.asObservable();
  }

  get selectedCategory$() {
    return this.selectedCategory.asObservable();
  }

  constructor(private http: HttpClient) {}

  fetchCategories() {
    this.http.get<string[]>(environment.BaseUrlCategory).subscribe(
      (categories) => {
        this.setCategories(categories);
      },
      (error) => {
        console.error('Failed to fetch categories:', error);
      }
    );
  }

  setCategories(categories: string[]) {
    this.categories.next(categories);
  }

  setSelectedCategory(category: string) {
    this.selectedCategory.next(category);
  }

  filterByCategory(category: string) {
    this.setSelectedCategory(category);
  }
}

