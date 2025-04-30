# Product Listing Page with SSR

This is a responsive product listing page built with React.js and Node.js for server-side rendering (SSR). The application fetches product data from the FakeStoreAPI and includes features like filtering, sorting, and user authentication.

## Features

- Server-Side Rendering (SSR) with Node.js and Express
- Responsive design for desktop, tablet, and mobile
- Product filtering and sorting
- User authentication (sign in/sign up)
- Product grid layout

## Technologies Used

- React.js (frontend)
- Node.js & Express (SSR server)
- Tailwind CSS (styling)
- FakeStoreAPI (product data)

## Getting Started

### Prerequisites

- Node.js (version 14 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```
git clone https://github.com/yourusername/product-listing-page.git
cd product-listing-page
```

2. Install dependencies:
```
npm install
# or
yarn install
```

3. Build the React app and start the SSR server:
```
npm run ssr:build
# or
yarn ssr:build
```

4. Open your browser and navigate to `http://localhost:3000`

### Development Mode

If you want to run the app in development mode without SSR:

```
npm start
# or
yarn start
```

## How SSR Works in This Project

1. The Express server pre-fetches product data from FakeStoreAPI
2. React components are rendered to HTML strings on the server
3. The server injects the initial data and rendered HTML into the page
4. The client-side JavaScript takes over ("hydrates") after the page loads
5. This approach provides faster initial page loads and better SEO

## Project Structure

```
src/
├── components/
│   ├── FilterSidebar.js
│   ├── Footer.js
│   ├── LoginModal.js
│   ├── Navbar.js
│   └── ProductCard.js
├── App.css
├── App.js
├── index.css
├── index.js
└── server.js (Express SSR server)
```

## Deployment

### For SSR Deployment (Recommended)

1. Deploy to a Node.js hosting platform like Heroku or DigitalOcean:
   ```
   # Build the app first
   npm run build
   
   # Start the SSR server in production
   node server.js
   ```

2. The server will run on the port specified by the `PORT` environment variable (defaults to 3000)

## License

This project is licensed under the MIT License.