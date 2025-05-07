const terms = [
  {
    term: "Pre-money Valuation",
    definition: "The valuation of a company before it receives new funding",
  },
  {
    term: "Post-money Valuation",
    definition:
      "The valuation after new funding has been added (pre-money + investment)",
  },
  {
    term: "Cap Table",
    definition: "A table showing the ownership stakes in a company",
  },
  {
    term: "Term Sheet",
    definition: "A non-binding agreement outlining the terms of an investment",
  },
  {
    term: "SAFE",
    definition:
      "Simple Agreement for Future Equity - a common early-stage investment instrument",
  },
  {
    term: "Convertible Note",
    definition: "A short-term debt that converts into equity",
  },
  {
    term: "Runway",
    definition: "How long a company can operate before needing more funding",
  },
  {
    term: "Burn Rate",
    definition: "The rate at which a company spends its cash reserves",
  },
];

export default function FundraisingGlossary() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Fundraising Glossary</h1>
      <div className="bg-white rounded-lg shadow p-6">
        <p className="mb-6">
          Key terms and concepts you need to know when raising funding for your
          startup.
        </p>
        <div className="space-y-4">
          {terms.map((item) => (
            <div key={item.term} className="border-b pb-4">
              <h3 className="font-bold text-lg">{item.term}</h3>
              <p className="text-gray-700">{item.definition}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
