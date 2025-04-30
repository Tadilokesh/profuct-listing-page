// server.js
const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3001;

// Serve static files
app.use(express.static(path.join(__dirname, 'build')));

// Simple fetch function for Node.js
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

// Pre-fetch products data for SSR
async function fetchProducts() {
  try {
    const response = await fetch('https://fakestoreapi.com/products');
    const data = await response.json();
    
    // Transform the data to match our UI requirements
    const transformedData = data.map(item => ({
      id: item.id,
      name: item.title.substring(0, 20) + (item.title.length > 20 ? '...' : ''),
      category: item.category,
      price: item.price,
      ideal: getRandomCategory(['Men', 'Women', 'Baby & Kids']),
      occasion: getRandomCategory(['Casual', 'Formal', 'Party', 'Travel']),
      work: getRandomCategory(['Handmade', 'Machine-made', 'Artisanal']),
      fabric: getRandomCategory(['Cotton', 'Leather', 'Wool', 'Synthetic']),
      segment: getRandomCategory(['Luxury', 'Budget', 'Premium']),
      suitable: getRandomCategory(['Gifting', 'Personal Use', 'Collection']),
      isCustomizable: Math.random() > 0.5,
      isOutOfStock: Math.random() > 0.8,
      image: item.image
    }));
    
    return transformedData;
  } catch (error) {
    console.error('Error fetching products:', error);
    return [];
  }
}

function getRandomCategory(options) {
  return options[Math.floor(Math.random() * options.length)];
}

// SSR route
app.get('/', async (req, res) => {
  try {
    // Fetch products data
    const products = await fetchProducts();
    
    // Read the build index.html
    const indexFile = path.resolve('./build/index.html');
    fs.readFile(indexFile, 'utf8', (err, data) => {
      if (err) {
        console.error('Error reading index.html:', err);
        return res.status(500).send('An error occurred');
      }
      
      // Inject our app data into the template
      const html = data.replace(
        '</head>',
        `<script>window.__INITIAL_DATA__ = ${JSON.stringify({ initialProducts: products })};</script></head>`
      );
      
      return res.send(html);
    });
  } catch (error) {
    console.error('Server error:', error);
    return res.status(500).send('Server error');
  }
});

// Handle all other routes
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'build', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});