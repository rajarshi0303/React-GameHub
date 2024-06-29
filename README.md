# React GameHub
React GameHub is a comprehensive gaming platform inspired by PlayStation, offering a wide range of features for gamers and gaming enthusiasts. This project aims to provide a seamless experience for browsing games, playing online, shopping for gaming products, and staying updated with the latest gaming news.

<p float="left">
<img src="https://github.com/rajarshi0303/React-GameHub/assets/128988468/28901cc1-bdbe-4db7-90d0-80cce6f126b8" width="380" height="600" hspace="5" />
<img src="https://github.com/rajarshi0303/React-GameHub/assets/128988468/f83e2b05-6d73-42aa-aba0-043cc028ba8c" width="350" height="600" />

<img src="https://github.com/rajarshi0303/React-GameHub/assets/128988468/c3f8e068-4ccf-47f1-832a-3d3a445686b7" width="370" height="550"  hspace="5" />
<img src="https://github.com/rajarshi0303/React-GameHub/assets/128988468/7a47eb49-cc3b-4f2b-b22d-07c13285044d" width="370" height="550"  />

<img src="https://github.com/rajarshi0303/React-GameHub/assets/128988468/e917c12b-6de1-4459-b13f-39474d2dd61e" width="400" height="550" hspace="5" />
<img src="https://github.com/rajarshi0303/React-GameHub/assets/128988468/2edb5f60-65e3-45e1-8368-2ce00ec968c1" width="360" height="550"  />
</p>



## 🚀 Features
### 🎮 Games
* Browse a vast collection of games
* Filter games by genre, price range, and platform
* Sort games based on various criteria
* Search functionality to find specific games
* Detailed game pages with features, characters, FAQs, ratings, screenshots, and trailers
* Add games to cart

### 🌐 Play Online
* Play games directly in the browser
* Filter online games for easy discovery

### 🛒 Store
* E-commerce functionality for gaming products
* Filter products by categories and price
* Sub-categories for specific product types (e.g., clothing brands, fabrics, sizes)
* Detailed product pages with color options, add to cart functionality, specifications, ratings, and reviews

### 📰 News
* Stay updated with trending game videos
* Read latest gaming news and blog articles

### 👤 User Authentication
* Sign up and sign in functionality
* Google API integration for quick authentication
* User profile management

### 👤 User Profile
* View and edit user information
* Access order history
* Manage cart items

### 🛒 Shopping Cart

* Add and remove items
* View price details
* Checkout process with delivery options

## 🛠️ Technologies Used
* React.js (UI Library)
* Tailwind CSS (Styling)
* Axios (API Calls)
* React-Router (Navigation)
* Json-server (mock REST API)
* Google Authentication
* Framer Motion (Animation)
* shadcn/UI (UI Component Library)
* AccernityUI (Additional UI Components)
* Zustand (Global State Management)
* Image, Video, and Component LazyLoading (Optimized performance)
* Responsive design for mobile and desktop
* Browser APIS

## Getting Started

### Prerequisites
* Node.js
* npm

### Installation
Clone the repository:
```shell
git clone https://github.com/rajarshi0303/React-GameHub.git
```
Install dependencies:
```shell
cd React-GameHub
npm install
```

Obtain an API key from Google OAuth and add it to main.jsx file:
```shell
ReactDOM.createRoot(document.getElementById("root")).render(
  <GoogleOAuthProvider clientId=your_api_key_here>
    <React.StrictMode>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </React.StrictMode>
  </GoogleOAuthProvider>
);
```

### Running the Application
Start the JSON Server:
```shell
npx json-server --watch db.json
```
In a new terminal, start the React application:
```shell
npm run dev
```
Open your browser and visit http://localhost:5173

## 📘 Usage
Here's a guide on how to use the main features of React GameHub:
### 🏠 Home Page
Upon opening the application, you'll land on the home page.
Navigate through different sections using the menu bar at the top.

### 🎮 Browsing Games
Click on the "Games" link in the navigation bar.
Use filters on the left sidebar to narrow down games by genre, price range, or platform.
Use the search bar at the top to find specific games.
Click on a game card to view more details.

### 🕹️ Game Details
On a game's detail page, you can:
View game features, characters, and FAQs
Check ratings and reviews
Watch game trailers and view screenshots
Add the game to your cart



### 🌐 Playing Games Online
Navigate to the "Play Online" section.
Browse available online games.
Use filters to find games by category or type.
Click on a game to start playing directly in your browser.

### 🛒 Shopping in the Store
Go to the "Store" section to browse gaming products.
Use category filters to find specific types of products.
Click on a product to view details, including color options and specifications.
Add products to your cart for purchase.

### 📰 Staying Updated with News
Visit the "News" section to read the latest gaming articles and watch trending videos.

### 👤 User Account
Sign Up / Sign In:
Click on the "Sign Up" or "Sign In" button in the navigation bar.
Choose between manual entry or Google authentication.
Profile Management:
After signing in, access your profile by clicking on your username.
View and edit your information, check order history, and manage your cart.

### 🛒 Using the Shopping Cart
Add items to your cart from game or product pages.
Click on the cart icon to view your items.
Adjust quantities or remove items as needed.
Proceed to checkout when ready to complete your purchase.

### 📱 Mobile Usage
The site is fully responsive. On mobile devices, you may find a hamburger menu for navigation.
