export default function Item({ name, quantity, category, onSelect }) {
    return (
        <section 
            className="bg-blue-100 p-4 m-4 border border-gray-300 shadow-md cursor-pointer rounded-lg hover:bg-blue-200 transition duration-200"
            onClick={() => onSelect(name)} // Ensure onSelect is triggered on click
        >
            <p className="font-bold text-gray-800">{name}</p>
            <p className="text-gray-600">Buy {quantity} in {category}</p>
        </section>
    );
}
