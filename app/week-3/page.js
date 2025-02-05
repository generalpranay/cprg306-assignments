import ItemList from "./item-list";

export default function Page() {
    return (
        <main className="min-h-screen bg-grey-100 p-6">
            <h1 className="text-2xl font-bold text-start mb-3">Shopping List</h1>
            <ItemList />
        </main>
    );
}
