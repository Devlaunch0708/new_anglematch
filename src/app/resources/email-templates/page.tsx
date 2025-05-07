const templates = [
  {
    name: "Cold Outreach Template",
    scenario: "Initial contact with investors",
  },
  { name: "Follow-up Template", scenario: "After a meeting or pitch" },
  { name: "Update Template", scenario: "Monthly investor updates" },
  { name: "Introduction Request", scenario: "Asking for warm introductions" },
];

export default function EmailTemplates() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Investor Email Templates</h1>
      <div className="bg-white rounded-lg shadow p-6">
        <p className="mb-6">
          Professionally crafted email templates for every stage of your
          fundraising process.
        </p>
        <div className="space-y-4">
          {templates.map((template) => (
            <div
              key={template.name}
              className="border rounded-lg p-4 hover:shadow-md transition-shadow"
            >
              <h3 className="font-bold">{template.name}</h3>
              <p className="text-sm text-gray-600 mt-1">{template.scenario}</p>
              <div className="flex gap-2 mt-3">
                <button className="text-sm bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700">
                  View Template
                </button>
                <button className="text-sm text-blue-600 hover:underline">
                  Copy to Clipboard
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
