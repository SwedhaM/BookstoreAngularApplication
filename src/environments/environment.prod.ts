export const environment = {
  production: true,
  ImageBaseUrl:'http://localhost:5285/resources/',
  JSONUrl:'http://localhost:3000',
  BaseUrl:'http://localhost:5285',
  MainBaseUrl:'http://localhost:5285/api/AngularProduct',
  BaseUrlCategory:'http://localhost:5285/api/AngularProduct/GetCategories/categories',
  SelectedPaymentMethod:'cashOnDelivery',
  OrderMessage:"Order has been placed",
  MenuType:"default",
  isSeller:"default",
  errorMessage: {
    duplicateEmail: 'Email already registered',
    passwordMismatch: 'Password and Confirm Password must match.',
    unknownError:'An error occurred during signup'
  },
  LoginerrorMessage:{
    invalidMessage:'Invalid email or password',
    unknownError:'An error occurred during signup'
  },
  addProductMessage:{
    waitMessage:'Wait',
    ProductMessage:'product added Successfully',
    Error:'Error on server side'
  },
  productUpdateMessage:{
    UpdatingMessage:'Updating product...',
    NotFound:'Product ID not found.',
    Success: 'Product has been updated successfully',
    Error:'Error updating product. Please try again.'
  }
};
