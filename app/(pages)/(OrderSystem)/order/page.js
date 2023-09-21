import React from "react";
import FoodGenerator from "./FoodGenerator";
import OrderDetails from "@/app/components/main/OrderDetails";
export default function Order() {
  return (
    <div className='className="max-w-6xl mx-auto"'>
      <FoodGenerator />
      <div id="basket" className="mt-20 max-w-5xl mx-auto">
        <OrderDetails></OrderDetails>
      </div>
    </div>
  );
}
