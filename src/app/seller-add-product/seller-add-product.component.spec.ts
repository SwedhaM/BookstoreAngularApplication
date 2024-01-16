/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { SellerAddProductComponent } from './seller-add-product.component';
import { ProductService } from '../services/product.service';
import { of } from 'rxjs';
describe('SellerAddProductComponent', () => {
  let component: SellerAddProductComponent;
  let fixture: ComponentFixture<SellerAddProductComponent>;
  let productService: ProductService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SellerAddProductComponent],
      imports: [ReactiveFormsModule], // Import ReactiveFormsModule for form testing
      providers: [ProductService] // Provide the ProductService
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SellerAddProductComponent);
    component = fixture.componentInstance;
    productService = TestBed.inject(ProductService); // Get the ProductService instance

    // Spy on the add method of the ProductService to return a mock observable
    spyOn(productService, 'add').and.returnValue(of({}));
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create the form with required fields', () => {
    expect(component.frm).toBeDefined();
    expect(component.frm.contains('name')).toBeTruthy();
    expect(component.frm.contains('price')).toBeTruthy();
    expect(component.frm.contains('category')).toBeTruthy();
    expect(component.frm.contains('color')).toBeTruthy();
    expect(component.frm.contains('authorname')).toBeTruthy();
    expect(component.frm.contains('description')).toBeTruthy();
  });

  it('should set addProductMessage when onPost is called', () => {
    component.onPost();
    expect(component.addProductMessage).toBe('wait..');
  });

  it('should call ProductService add method with correct data when onPost is called', () => {
    const formValue = {
      id: 0,
      name: 'Sample Product',
      price: 100,
      category: 'Sample Category',
      color: 'Sample Color',
      authorname: 'Sample Author',
      description: 'Sample Description',
      imageFile: undefined,
      image: '', // Add the 'image' property
      quantity: 0, // Add the 'quantity' property
      productId: 0 // Add the 'productId' property
    };
    component.frm.setValue(formValue);
    component.onPost();
    expect(productService.add).toHaveBeenCalledWith(formValue);
  });

  it('should reset addProductMessage after ProductService add is successful', () => {
    component.onPost();
    expect(component.addProductMessage).toBe('product added Successfully');
  });

  it('should log an error message when ProductService add throws an error', () => {
    const errorMessage = 'Sample Error';
    spyOn(console, 'log');
    spyOn(productService, 'add').and.returnValue(of({})); // Change return value to throw an error

    component.onPost();

    expect(component.addProductMessage).toBe('Error on server side');
    expect(console.log).toHaveBeenCalledWith(errorMessage);
  });

  it('should set imageFile when onChange is called', () => {
    const file = new File(['sample'], 'sample.txt', { type: 'text/plain' });
    const event = { target: { files: [file] } } as any;

    component.onChange(event);
    expect(component.imageFile).toBe(file);
  });
});
