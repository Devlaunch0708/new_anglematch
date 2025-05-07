export default function InvestorDatabase() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Investor Database</h1>
      <div className="bg-white rounded-lg shadow p-6">
        <p className="mb-4">
          Connect with thousands of active angel investors and venture capital
          firms. Filter by industry, check size, and investment stage.
        </p>
        <div className="mt-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">Featured Investors</h2>
            <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
              Join Database
            </button>
          </div>
          <div className="space-y-3">
            {[
              "Sequoia Capital",
              "Andreessen Horowitz",
              "Y Combinator",
              "First Round Capital",
            ].map((investor) => (
              <div
                key={investor}
                className="p-3 border rounded flex justify-between items-center"
              >
                <span>{investor}</span>
                <button className="text-sm text-blue-600 hover:underline">
                  View Profile
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
