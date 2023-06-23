import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface Product {
  id: number;
  name: string;
  category: string;
}

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private products: Product[] = [
    { id: 1, name: 'Product 1', category: 'Category 1' },
    { id: 2, name: 'Product 2', category: 'Category 2' },
    { id: 3, name: 'Product 3', category: 'Category 1' },
  ];

  private filteredProducts = new BehaviorSubject<Product[]>(this.products);

  private categories: string[] = [];

  constructor() {
    this.categories = this.getUniqueCategories();
  }

  private getUniqueCategories(): string[] {
    const uniqueCategories = new Set<string>();
    this.products.forEach((product) => uniqueCategories.add(product.category));
    return Array.from(uniqueCategories);
  }

  getFilteredProducts() {
    return this.filteredProducts.asObservable();
  }

  getCategories() {
    return this.categories;
  }

  filterProducts(category: string) {
    const filtered = this.products.filter((product) => {
      const categoryMatch = category === 'All' || product.category === category;
      return categoryMatch;
    });

    this.filteredProducts.next(filtered);
  }
}
