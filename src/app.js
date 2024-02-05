
const express = require('express');
const ProductManager = require('./ProductManager');

const app = express();
const PORT = 3000;

const productManager = ProductManager.loadProductsFromJSON();


app.get('/products', (req, res) => {
  const limit = parseInt(req.query.limit);

  if (isNaN(limit)) {
    res.json({ products: productManager.products });
  } else {
    const limitedProducts = productManager.products.slice(0, limit);
    res.json({ products: limitedProducts });
  }
});

app.get('/products/:pid', (req, res) => {
  const productId = parseInt(req.params.pid);
  const product = productManager.getProductById(productId);

  if (product) {
    res.json({ product });
  } else {
    res.status(404).json({ error: 'Product not found' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

