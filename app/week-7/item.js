export default function Item({ name, quantity, category }) {
    return (
        <section className="bg-lightblue-100 p-4 m-4 border  shadow ">
            <p className="font-bold text-white-250">{name}</p>
            <p>Buy {quantity} in {category}</p>
        </section>
    );
}
