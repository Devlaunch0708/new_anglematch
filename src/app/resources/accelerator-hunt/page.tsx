export default function AcceleratorHunt() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Accelerator Hunt</h1>
      <div className="bg-white rounded-lg shadow p-6">
        <p className="mb-4">
          Find the perfect startup accelerator program for your business. Our
          database includes programs from around the world with detailed filters
          to match your needs.
        </p>
        <div className="mt-6">
          <h2 className="text-xl font-semibold mb-3">Featured Accelerators</h2>
          <ul className="space-y-2">
            <li className="p-3 border rounded hover:bg-gray-50">
              Y Combinator
            </li>
            <li className="p-3 border rounded hover:bg-gray-50">Techstars</li>
            <li className="p-3 border rounded hover:bg-gray-50">
              500 Startups
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
