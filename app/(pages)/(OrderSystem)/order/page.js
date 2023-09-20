import React from "react";
import FoodGenerator from "./FoodGenerator";
import OrderDetails from "@/app/components/main/OrderDetails";
export default function Order() {
  return (
    <div className='className="max-w-6xl mx-auto"'>
      <FoodGenerator />
      <div className="mt-20">
        <OrderDetails></OrderDetails>
      </div>
    </div>
  );
}
