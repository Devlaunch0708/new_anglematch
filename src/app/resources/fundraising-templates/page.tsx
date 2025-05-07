const templates = [
  { name: "Pitch Deck Template", category: "Presentation" },
  { name: "Investor Update Template", category: "Communication" },
  { name: "Cap Table Template", category: "Financial" },
  { name: "Term Sheet Template", category: "Legal" },
];

export default function FundraisingTemplates() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Fundraising Templates</h1>
      <div className="bg-white rounded-lg shadow p-6">
        <p className="mb-6">
          Download ready-to-use templates to streamline your fundraising
          process.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {templates.map((template) => (
            <div
              key={template.name}
              className="border rounded-lg p-4 hover:shadow-md transition-shadow"
            >
              <h3 className="font-bold">{template.name}</h3>
              <p className="text-sm text-gray-600 mt-1">{template.category}</p>
              <button className="mt-3 text-sm bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700">
                Download
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
