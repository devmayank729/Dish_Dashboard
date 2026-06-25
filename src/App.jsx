import { useState, useEffect } from "react";
import axios from "axios";
import DishCard from "./components/DishCard";

function App() {
  const [dishes, setDishes] = useState([]);


  useEffect(() => {
    fetchDishes();
  }, []);

  const fetchDishes = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/dishes");
      setDishes(response.data);
    } catch (error) {
      console.error("Error fetching dishes:", error);
    }
  };

  const handleToggle = async (id) => {
  setDishes(prevDishes => 
    prevDishes.map(dish => 
      dish.dishId === id ? { ...dish, isPublished: !dish.isPublished } : dish
    )
  );

  try {

    await axios.patch(`http://localhost:5000/api/dishes/${id}/toggle`);
  } catch (error) {
    console.error("Error toggling dish:", error);
  
    fetchDishes(); 
  }
};

  return (
    <div className="min-h-screen bg-slate-950 p-8">
      <h1 className="text-3xl font-bold text-white mb-8 text-center">Admin Dish Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {dishes.map((dish) => (
          <DishCard key={dish.dishId} dish={dish} onToggle={handleToggle} />
        ))}
      </div>
    </div>
  );
}

export default App;