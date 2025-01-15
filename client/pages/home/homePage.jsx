import React from 'react';
import Banner from '../../components/banner/Banner';
import NewProducts from '../../components/products/newProducts';
import ProductCarousel from '../../components/products/productCarousel';
// import './App.css';  // Global styles (optional)


const Tcg = [
  { name: 'Product 1', price: 14.99, image: 'https://gatherer.wizards.com/Handlers/Image.ashx?multiverseid=600&type=card' },
  { name: 'Product 2', price: 15.99, image: 'https://gatherer.wizards.com/Handlers/Image.ashx?multiverseid=600&type=card' },
  { name: 'Product 3', price: 16.99, image: 'https://gatherer.wizards.com/Handlers/Image.ashx?multiverseid=600&type=card' },
  { name: 'Product 4', price: 17.99, image: 'https://gatherer.wizards.com/Handlers/Image.ashx?multiverseid=600&type=card' },
  { name: 'Product 5', price: 106.99, image: 'https://gatherer.wizards.com/Handlers/Image.ashx?multiverseid=600&type=card' },
  { name: 'Product 6', price: 106.99, image: 'https://gatherer.wizards.com/Handlers/Image.ashx?multiverseid=600&type=card' },
  { name: 'Product 7', price: 1054.99, image: 'https://gatherer.wizards.com/Handlers/Image.ashx?multiverseid=600&type=card' },
  { name: 'Product 8', price: 103334.99, image: 'https://gatherer.wizards.com/Handlers/Image.ashx?multiverseid=600&type=card' },
];

const Sport = [
  { name: 'Product 1', price: 14.99, image: 'https://cloutsnchara.com/cdn-cgi/image/width=400,height=560,fit=crop,quality=80,format=auto,onerror=redirect,metadata=none/wp-content/uploads/2022/10/2023-24-Upper-Deck-Series-2-Young-Guns-Connor-Bedard.jpg' },
  { name: 'Product 2', price: 15.99, image: 'https://cloutsnchara.com/cdn-cgi/image/width=400,height=560,fit=crop,quality=80,format=auto,onerror=redirect,metadata=none/wp-content/uploads/2022/10/2023-24-Upper-Deck-Series-2-Young-Guns-Connor-Bedard.jpg' },
  { name: 'Product 3', price: 16.99, image: 'https://cloutsnchara.com/cdn-cgi/image/width=400,height=560,fit=crop,quality=80,format=auto,onerror=redirect,metadata=none/wp-content/uploads/2022/10/2023-24-Upper-Deck-Series-2-Young-Guns-Connor-Bedard.jpg' },
  { name: 'Product 4', price: 17.99, image: 'https://cloutsnchara.com/cdn-cgi/image/width=400,height=560,fit=crop,quality=80,format=auto,onerror=redirect,metadata=none/wp-content/uploads/2022/10/2023-24-Upper-Deck-Series-2-Young-Guns-Connor-Bedard.jpg' },
  { name: 'Product 5', price: 106.99, image: 'https://cloutsnchara.com/cdn-cgi/image/width=400,height=560,fit=crop,quality=80,format=auto,onerror=redirect,metadata=none/wp-content/uploads/2022/10/2023-24-Upper-Deck-Series-2-Young-Guns-Connor-Bedard.jpg' },
  { name: 'Product 6', price: 106.99, image: 'https://cloutsnchara.com/cdn-cgi/image/width=400,height=560,fit=crop,quality=80,format=auto,onerror=redirect,metadata=none/wp-content/uploads/2022/10/2023-24-Upper-Deck-Series-2-Young-Guns-Connor-Bedard.jpg' },
  { name: 'Product 7', price: 1054.99, image: 'https://cloutsnchara.com/cdn-cgi/image/width=400,height=560,fit=crop,quality=80,format=auto,onerror=redirect,metadata=none/wp-content/uploads/2022/10/2023-24-Upper-Deck-Series-2-Young-Guns-Connor-Bedard.jpg' },
  { name: 'Product 8', price: 103334.99, image: 'https://cloutsnchara.com/cdn-cgi/image/width=400,height=560,fit=crop,quality=80,format=auto,onerror=redirect,metadata=none/wp-content/uploads/2022/10/2023-24-Upper-Deck-Series-2-Young-Guns-Connor-Bedard.jpg' },
];

const VideoGame = [
  { name: 'Product 1', price: 14.99, image: 'https://upload.wikimedia.org/wikipedia/en/c/c2/Final_Fantasy_VII_Box_Art.jpg' },
  { name: 'Product 2', price: 15.99, image: 'https://upload.wikimedia.org/wikipedia/en/c/c2/Final_Fantasy_VII_Box_Art.jpg' },
  { name: 'Product 3', price: 16.99, image: 'https://upload.wikimedia.org/wikipedia/en/c/c2/Final_Fantasy_VII_Box_Art.jpg' },
  { name: 'Product 4', price: 17.99, image: 'https://upload.wikimedia.org/wikipedia/en/c/c2/Final_Fantasy_VII_Box_Art.jpg' },
  { name: 'Product 5', price: 106.99, image: 'https://upload.wikimedia.org/wikipedia/en/c/c2/Final_Fantasy_VII_Box_Art.jpg' },
  { name: 'Product 6', price: 106.99, image: 'https://upload.wikimedia.org/wikipedia/en/c/c2/Final_Fantasy_VII_Box_Art.jpg' },
  { name: 'Product 7', price: 1054.99, image: 'https://upload.wikimedia.org/wikipedia/en/c/c2/Final_Fantasy_VII_Box_Art.jpg' },
  { name: 'Product 8', price: 103334.99, image: 'https://upload.wikimedia.org/wikipedia/en/c/c2/Final_Fantasy_VII_Box_Art.jpg' },
];




function App() {
  return (
    <div className="">
      <Banner />
      <NewProducts />
      <ProductCarousel title="Tcg's collections" products={Tcg} />
      <ProductCarousel title="Sport's collections" products={Sport} />
      <ProductCarousel title="Video Game's collections" products={VideoGame} />
    </div>
  );
}

export default App;
