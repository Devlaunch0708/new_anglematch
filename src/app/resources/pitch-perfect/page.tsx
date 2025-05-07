export default function PitchPerfect() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Pitch Perfect</h1>
      <div className="bg-white rounded-lg shadow p-6">
        <div className="md:flex gap-6">
          <div className="md:w-1/2 mb-6 md:mb-0">
            <h2 className="text-xl font-semibold mb-3">Perfect Your Pitch</h2>
            <p className="mb-4">
              Our AI-powered tool analyzes your pitch deck and provides
              actionable feedback to improve your chances of securing funding.
            </p>
            <button className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700">
              Upload Your Pitch Deck
            </button>
          </div>
          <div className="md:w-1/2">
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
              <p className="text-gray-500">Pitch Deck Preview</p>
              <p className="text-sm text-gray-400 mt-2">
                Upload to get started
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
