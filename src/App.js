// src/App.js - Updated with improved filter logic
import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Spinner } from 'react-bootstrap';
import './App.css';
import Navbar from './components/Navbar';
import ProductCard from './components/ProductCard';
import FilterSidebar from './components/FilterSidebar';
import Footer from './components/Footer';
import LoginModal from './components/LoginModal';

function App() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [totalItems, setTotalItems] = useState(0);
  const [showFilters, setShowFilters] = useState(true);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [sortOption, setSortOption] = useState('RECOMMENDED');
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [filterOptions, setFilterOptions] = useState({
    customizable: false,
    ideal: [],
    occasion: [],
    work: [],
    fabric: [],
    segment: [],
    suitable: []
  });

  // Detect window resize for responsive behavior
  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      if (mobile) {
        setShowFilters(false);
      } else {
        setShowFilters(true);
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize(); // Initial check
    
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    // Check if we have initial data from SSR
    if (window.__INITIAL_DATA__?.initialProducts) {
      const initialProducts = window.__INITIAL_DATA__.initialProducts;
      setProducts(initialProducts);
      setFilteredProducts(initialProducts);
      setTotalItems(initialProducts.length);
      setLoading(false);
    } else {
      fetchProducts();
    }
  }, []);

  useEffect(() => {
    applyFilters();
  }, [products, filterOptions, sortOption]);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await fetch('https://fakestoreapi.com/products');
      if (!response.ok) {
        throw new Error('Failed to fetch products');
      }
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
      
      setProducts(transformedData);
      setFilteredProducts(transformedData);
      setTotalItems(transformedData.length);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  const getRandomCategory = (options) => {
    return options[Math.floor(Math.random() * options.length)];
  };

  const applyFilters = () => {
    let result = [...products];
    
    // Apply customizable filter
    if (filterOptions.customizable) {
      result = result.filter(product => product.isCustomizable);
    }
    
    // Apply ideal filter
    if (filterOptions.ideal.length > 0) {
      result = result.filter(product => 
        filterOptions.ideal.includes(product.ideal) || filterOptions.ideal.includes('All')
      );
    }
    
    // Apply occasion filter
    if (filterOptions.occasion.length > 0) {
      result = result.filter(product => 
        filterOptions.occasion.includes(product.occasion) || filterOptions.occasion.includes('All')
      );
    }
    
    // Apply work filter
    if (filterOptions.work.length > 0) {
      result = result.filter(product => 
        filterOptions.work.includes(product.work) || filterOptions.work.includes('All')
      );
    }
    
    // Apply fabric filter
    if (filterOptions.fabric.length > 0) {
      result = result.filter(product => 
        filterOptions.fabric.includes(product.fabric) || filterOptions.fabric.includes('All')
      );
    }
    
    // Apply segment filter
    if (filterOptions.segment.length > 0) {
      result = result.filter(product => 
        filterOptions.segment.includes(product.segment) || filterOptions.segment.includes('All')
      );
    }
    
    // Apply suitable filter
    if (filterOptions.suitable.length > 0) {
      result = result.filter(product => 
        filterOptions.suitable.includes(product.suitable) || filterOptions.suitable.includes('All')
      );
    }
    
    // Apply sorting
    if (sortOption === 'NEWEST FIRST') {
      result.sort((a, b) => b.id - a.id);
    } else if (sortOption === 'POPULAR') {
      result.sort((a, b) => (Math.random() > 0.5 ? 1 : -1)); // Just for demo
    } else if (sortOption === 'PRICE : HIGH TO LOW') {
      result.sort((a, b) => b.price - a.price);
    } else if (sortOption === 'PRICE : LOW TO HIGH') {
      result.sort((a, b) => a.price - b.price);
    }
    
    setFilteredProducts(result);
    setTotalItems(result.length);
  };

  const handleFilterChange = (filterType, value) => {
    setFilterOptions(prev => {
      if (filterType === 'customizable') {
        return { ...prev, customizable: value };
      } else {
        // If value is an empty array, it means "Unselect all" was clicked
        if (Array.isArray(value) && value.length === 0) {
          return { ...prev, [filterType]: [] };
        }
        
        // For arrays like ideal, occasion, etc.
        if (value === 'All') {
          return { ...prev, [filterType]: ['All'] };
        } else if (prev[filterType].includes(value)) {
          return { 
            ...prev, 
            [filterType]: prev[filterType].filter(item => item !== value && item !== 'All')
          };
        } else {
          return { 
            ...prev, 
            [filterType]: [...prev[filterType].filter(item => item !== 'All'), value]
          };
        }
      }
    });
  };

  const handleSortChange = (option) => {
    setSortOption(option);
  };

  const toggleFilters = () => {
    setShowFilters(!showFilters);
  };

  const toggleLoginModal = () => {
    setShowLoginModal(!showLoginModal);
  };

  return (
    <div className="d-flex flex-column min-vh-100">
      <Navbar onLoginClick={toggleLoginModal} />
      
      <main className="flex-grow-1 py-4">
        <Container>
          <h1 className="text-center mb-2 fw-semibold">DISCOVER OUR PRODUCTS</h1>
          <p className="text-center text-muted mb-4 mx-auto" style={{ maxWidth: '600px' }}>
            Lorem ipsum dolor sit amet consectetur. Amet est posuere rhoncus scelerisque. Dolor integer scelerisque nibh amet mi ut elementum dolor.
          </p>
          
          {/* Mobile filter/sort header */}
          <div className="d-md-none border-top border-bottom">
            <Row className="g-0">
              <Col xs={6} className="py-3 text-center border-end">
                <button 
                  className="btn btn-link text-dark text-decoration-none fw-medium"
                  onClick={toggleFilters}
                >
                  FILTER
                </button>
              </Col>
              <Col xs={6} className="py-3 text-center dropdown">
                <button 
                  className="btn btn-link text-dark text-decoration-none fw-medium dropdown-toggle d-flex align-items-center justify-content-center w-100"
                  type="button" 
                  id="sortDropdownMobile"
                  data-bs-toggle="dropdown" 
                  aria-expanded="false"
                >
                  RECOMMENDED
                  <i className="bi bi-chevron-down ms-1"></i>
                </button>
                <ul className="dropdown-menu w-100" aria-labelledby="sortDropdownMobile">
                  {['RECOMMENDED', 'NEWEST FIRST', 'POPULAR', 'PRICE : HIGH TO LOW', 'PRICE : LOW TO HIGH'].map(option => (
                    <li key={option}>
                      <button 
                        className="dropdown-item" 
                        onClick={() => handleSortChange(option)}
                      >
                        {option === sortOption && '✓ '}{option}
                      </button>
                    </li>
                  ))}
                </ul>
              </Col>
            </Row>
          </div>
          
          {/* Desktop filter/sort header */}
          <div className="d-none d-md-flex justify-content-between align-items-center my-3">
            <div className="d-flex align-items-center">
              <span className="me-2">{totalItems} ITEMS</span>
              {showFilters ? (
                <button 
                  className="btn btn-sm btn-link text-secondary p-0"
                  onClick={toggleFilters}
                >
                  <i className="bi bi-chevron-left me-1"></i>
                  HIDE FILTER
                </button>
              ) : (
                <button 
                  className="btn btn-sm btn-link text-secondary p-0"
                  onClick={toggleFilters}
                >
                  SHOW FILTER
                </button>
              )}
            </div>
            <div className="dropdown">
              <button 
                className="btn btn-sm btn-link text-dark text-decoration-none p-0 d-flex align-items-center" 
                type="button" 
                id="sortDropdown"
                data-bs-toggle="dropdown" 
                aria-expanded="false"
              >
                {sortOption}
                <i className="bi bi-chevron-down ms-1"></i>
              </button>
              <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="sortDropdown">
                {['RECOMMENDED', 'NEWEST FIRST', 'POPULAR', 'PRICE : HIGH TO LOW', 'PRICE : LOW TO HIGH'].map(option => (
                  <li key={option}>
                    <button 
                      className="dropdown-item" 
                      onClick={() => handleSortChange(option)}
                    >
                      {option === sortOption && '✓ '}{option}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          
          <Row>
            {showFilters && (
              <Col lg={3} md={4} className="mb-4 mb-md-0">
                <FilterSidebar 
                  filterOptions={filterOptions}
                  onFilterChange={handleFilterChange}
                  onClose={() => setShowFilters(false)}
                  isMobile={isMobile}
                />
              </Col>
            )}
            
            <Col lg={showFilters ? 9 : 12} md={showFilters ? 8 : 12}>
              {loading ? (
                <div className="d-flex justify-content-center align-items-center my-5">
                  <Spinner animation="border" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </Spinner>
                </div>
              ) : error ? (
                <div className="alert alert-danger my-5 text-center">
                  Error: {error}
                </div>
              ) : (
                <Row xs={2} md={showFilters ? 2 : 3} lg={showFilters ? 3 : 4} xl={showFilters ? 4 : 5} className="g-3">
                  {filteredProducts.map((product) => (
                    <Col key={product.id}>
                      <ProductCard product={product} onLoginClick={toggleLoginModal} />
                    </Col>
                  ))}
                </Row>
              )}
            </Col>
          </Row>
        </Container>
      </main>
      
      <Footer onLoginClick={toggleLoginModal} />
      
      {showLoginModal && <LoginModal onClose={toggleLoginModal} />}
    </div>
  );
}

export default App;