import React from "react";

const DishCard = ({ dish, onToggle }) => {
  return (
    <div className="border border-slate-700 rounded-lg p-4 bg-slate-900 text-white flex flex-col items-center">
      <img 
        src={dish.imageUrl} 
        alt={dish.dishName} 
        className="w-full h-40 object-cover rounded-md mb-4" 
      />
      <h3 className="text-lg font-bold mb-2 text-center">{dish.dishName}</h3>
      <p className="mb-4 text-sm text-slate-400">
        Status: {dish.isPublished ? "Published" : "Unpublished"}
      </p>
      <button
        onClick={() => onToggle(dish.dishId)}
        className={`cursor-pointer px-4 py-2 rounded-md font-semibold w-full transition-colors ${
          dish.isPublished 
            ? "bg-red-600 hover:bg-red-700 text-white" 
            : "bg-green-600 hover:bg-green-700 text-white"
        }`}
      >
        {dish.isPublished ? "Unpublish" : "Publish"}
      </button>
    </div>
  );
};

export default DishCard;