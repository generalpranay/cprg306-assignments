'use client'
import { useState } from "react";

export default function Counter(){
    const[quantity,setQuantity] = useState(1);

    const increment =()=>{
        if(quantity < 20){
            setQuantity(quantity+1);
        }
        else{
            alert("the number should be less then 20 ");
        }
    };
    const deccrement =()=>{
        if(quantity > 1){
            setQuantity(quantity - 1);
        }
        else{
            alert("the number should be greater than zero");
        }
    };
    return(
        <div class="mx-auto" >
             <div class="flex-1 bg-blue-100 mx-auto max-w-sm p-4 rounded-lg justify-center align items center ">
            <p class=" font-bold text-center text-black">Quantity : {quantity}</p>
            </div>
            <div class="text-center">
            <button  class="bg-blue-500 px-9 py-4 active:bg-yellow-700  text-white font-bold py-2 px-4 rounded" onClick={deccrement}> - </button>
            <button class="bg-blue-500 px-9 py-4 active:bg-yellow-700 text-white font-bold py-2 px-4 rounded" onClick={increment}> + </button>
            </div>
        </div>
    );
}