export default function PitchDeckDatabase() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Pitch Deck Database</h1>
      <div className="bg-white rounded-lg shadow p-6">
        <p className="mb-4">
          Access real pitch decks from successful startups that raised funding.
          Learn from their structure, design, and content strategies.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
          {["Airbnb", "Uber", "Dropbox", "Facebook"].map((company) => (
            <div
              key={company}
              className="border rounded-lg p-4 hover:shadow-md transition-shadow"
            >
              <h3 className="font-medium">{company} Pitch Deck</h3>
              <p className="text-sm text-gray-600 mt-1">
                PDF • {Math.floor(Math.random() * 10) + 1}MB
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
