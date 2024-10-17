import './App.css';
import RestaurantList from './components/Restaurant';
import RestaurantForm from './components/RestaurantForm';

function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="bg-blue-600 text-white p-4">
        <h1 className="text-2xl font-semibold text-start px-8">Restaurants</h1>
      </header>
      <main className="flex-grow">
        <RestaurantList />
        <RestaurantForm />
      </main>
      <footer className="bg-gray-800 text-white p-4">
        <p className="text-center">&copy; 2024 Restaurant Finder. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default App;
