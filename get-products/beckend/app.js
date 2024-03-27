const express = require('express');
const app = express();

const products = [
  {
    "productName": "Laptop 1",
    "companyName": "AMZ",
    "categoryName": "Laptop",
    "price": 2236,
    "rating": 4.7,
    "discount": 63,
    "availability": "yes"
  },
  {
    "productName": "Laptop 13",
    "companyName": "AMZ",
    "categoryName": "Laptop",
    "price": 1244,
    "rating": 4.5,
    "discount": 45,
    "availability": "out-of-stock"
  },
  {
    "productName": "Laptop 3",
    "companyName": "AMZ",
    "categoryName": "Laptop",
    "price": 12000,
    "rating": 4.44,
    "discount": 98,
    "availability": "out-of-stock"
  },
  {
    "productName": "Galaxy S21",
    "companyName": "SNP",
    "categoryName": "Smartphone",
    "price": 79999,
    "rating": 4.7,
    "discount": 10,
    "availability": "in-stock"
  },
  {
    "productName": "EOS Rebel T7",
    "companyName": "AZO",
    "categoryName": "Camera",
    "price": 3900,
    "rating": 4.2,
    "discount": 12,
    "availability": "in-stock"
  },
  {
    "productName": "P30 Pro",
    "companyName": "MYN",
    "categoryName": "Smartphone",
    "price": 54999,
    "rating": 4.6,
    "discount": 20,
    "availability": "in-stock"
  },
  {
    "productName": "Surface Pro 8",
    "companyName": "FLP",
    "categoryName": "Tablet",
    "price": 8999,
    "rating": 4.4,
    "discount": 15,
    "availability": "in-stock"
  },
  {
    "productName": "Yoga Slim 7",
    "companyName": "AZO",
    "categoryName": "Laptop",
    "price": 15000,
    "rating": 4.3,
    "discount": 5,
    "availability": "in-stock"
  },
  {
    "productName": "AirPods Pro",
    "companyName": "AMZ",
    "categoryName": "Earphone",
    "price": 2400,
    "rating": 4.8,
    "discount": 8,
    "availability": "in-stock"
  },
  {
    "productName": "Apple Watch Series 7",
    "companyName": "AMZ", 
    "categoryName": "Smartwatch",
    "price": 4100,
    "rating": 4.6,
    "discount": 5,
    "availability": "out-of-stock"
  },
  {
    "productName": "Inspiron 15",
    "companyName": "FLP",
    "categoryName": "Laptop",
    "price": 57999,
    "rating": 4.1,
    "discount": 10,
    "availability": "in-stock"
  },
  {
    "productName": "Galaxy Tab S7",
    "companyName": "SNP",
    "categoryName": "Tablet",
    "price": 6999,
    "rating": 4.5,
    "discount": 18,
    "availability": "in-stock" 
  },
  {
    "productName": "ThinkPad X1 Carbon",
    "companyName": "AZO",
    "categoryName": "Laptop",
    "price": 1499,
    "rating": 4.7,
    "discount": 12,
    "availability": "out-of-stock"
  },
  {
    "productName": "Powerbeats Pro",
    "companyName": "AMZ",
    "categoryName": "Earphone",
    "price": 1990,
    "rating": 4.4,
    "discount": 10,
    "availability": "in-stock"
  },
  {
    "productName": "XPS 13",
    "companyName": "FLP",
    "categoryName": "Laptop",
    "price": 9999,
    "rating": 4.6,
    "discount": 8,
    "availability": "in-stock"
  }
 
];


app.get('/test/companies/:companyname/categories/:categoryname/products', (req, res) => {
  const { companyname, categoryname } = req.params;
  const { top, minPrice, maxPrice } = req.query;

  const validCompanies = ["AMZ", "FLP", "SNP", "MYN", "AZO"];
  if (!validCompanies.includes(companyname)) {
    return res.status(400).json({ error: 'Invalid company name' });
  }


  const validCategories = ["Phone", "Computer", "TV", "Earphone", "Tablet", "Charger", "Mouse", "Keypad", "Bluetooth", "Pendrive", "Remote", "Speaker", "Headset", "Laptop", "PC"];
  if (!validCategories.includes(categoryname)) {
    return res.status(400).json({ error: 'Invalid category name' });
  }


  const filteredProducts = products.filter(product =>
    product.companyName === companyname &&
    product.categoryName === categoryname &&
    product.price >= minPrice &&
    product.price <= maxPrice
  );


  const sortedProducts = filteredProducts.sort((a, b) => b.rating - a.rating);


  const topProducts = sortedProducts.slice(0, top);

  const responseProducts = topProducts.map(product => {
    const { companyName, categoryName, ...rest } = product;
    return rest;
  });

  res.json(responseProducts);
});

app.listen(3000, () => {
  console.log('API server is running on port 3000');
});