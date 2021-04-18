# reactjs implementation of cart-lib
This is a sample implementation of [cart-lib](https://github.com/rigozeta/cart-lib) using reactjs. Featuring product listing, add to cart, remove from cart, update cart contents.

# Demo
https://createur.jrcgonzalez.com/

# External Service
I've used [MockAPI](https://mockapi.io/) to provide a simple json server for live use.
For local development, you may use [json-server](https://www.npmjs.com/package/json-server) to mock your rest api (already added in package.json)

# Setup
```npm install```

# Components
- App (Main app)
- Products (List of sample products)
- ProductDetails (Single product info where you can add to cart. Added Min of 1 and max of 100 per part addition for validation purposes)
- CartDetails (You cart page that displays all items added to your cart. You may also directly update your cart's content such as add, deduct quantity of your items, and also remove them totally from your cart)

# Scripts
```npm start```
Run react app in browser (local)

```npm run db```
Run instance of json-server for local mocking of api

```npm run dev```
Run both react app and json-server at the same time.

```npm run build```
Default react build script for production

# Using json-server
If you want to add/remove more products to the product list, you may do so, by updating the contents of `db.json`.
Then update your API calls in the components such that the urls will be: `http://localhost:4001/products`

# Reference
[GitHub](https://github.com/rigozeta/ecommerce-cart-react): https://github.com/rigozeta/ecommerce-cart-react
