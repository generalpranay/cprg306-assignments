'use client';
import { useState } from 'react';

export default function NewItemForm() {
    const [name, setName] = useState('');
    const [quantity, setQuantity] = useState(1);
    const [category, setCategory] = useState('Produce');

    const increment = () => {
        if (quantity < 20) {
            setQuantity(quantity + 1);
        } else {
            alert('The quantity should be less than 20');
        }
    };

    const decrement = () => {
        if (quantity > 1) {
            setQuantity(quantity - 1);
        } else {
            alert('The quantity should be greater than zero');
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const item = { name, quantity, category };
        console.log(item);
        alert(`Item Added:\nName: ${name}\nQuantity: ${quantity}\nCategory: ${category}`);
        setName('');
        setQuantity(1);
        setCategory('Produce');
    };

    return (
        <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-xl font-bold mb-4 text-center text-black">Add New Item</h2>
            <form onSubmit={handleSubmit} className="space-y-4 text-black">
                
                {/* Name Input */}
                <div>
                    <label className="block font-semibold text-black">Name:</label>
                    <input 
                        type="text" 
                        value={name} 
                        onChange={(e) => setName(e.target.value)} 
                        required 
                        className="w-full border border-gray-300 rounded p-2 text-black"
                        placeholder="Enter item name"
                    />
                </div>

                {/* Quantity Counter */}
                <div className="text-center text-black">
                    <p className="font-semibold">Quantity: {quantity}</p>
                    <button 
                        type="button" 
                        className="bg-blue-500 text-white px-4 py-2 rounded mx-2" 
                        onClick={decrement}
                    > - </button>
                    <button 
                        type="button" 
                        className="bg-blue-500 text-white px-4 py-2 rounded mx-2" 
                        onClick={increment}
                    > + </button>
                </div>

                {/* Category Select */}
                <div>
                    <label className="block font-semibold text-black">Category:</label>
                    <select 
                        value={category} 
                        onChange={(e) => setCategory(e.target.value)} 
                        className="w-full border border-gray-300 rounded p-2 text-black"
                    >
                        {["Produce", "Dairy", "Bakery", "Meat", "Frozen Foods", "Canned Goods", 
                          "Dry Goods", "Beverages", "Snacks", "Household", "Other"].map(cat => (
                            <option key={cat} value={cat} className="text-black">{cat}</option>
                        ))}
                    </select>
                </div>

                {/* Submit Button */}
                <button 
                    type="submit" 
                    className="w-full bg-green-500 text-white font-bold py-2 rounded"
                >
                    Add Item
                </button>
            </form>
        </div>
    );
}
