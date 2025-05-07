const articles = [
  { title: "How to Craft the Perfect Pitch", date: "Apr 15, 2025" },
  { title: "Understanding Valuation Methods", date: "Mar 28, 2025" },
  { title: "The Do's and Don'ts of Investor Emails", date: "Mar 10, 2025" },
];

export default function Publication() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">AngelMatch Publications</h1>
      <div className="bg-white rounded-lg shadow p-6">
        <p className="mb-6">
          Expert insights and advice on startup fundraising and investor
          relations.
        </p>
        <div className="space-y-4">
          {articles.map((article) => (
            <div key={article.title} className="border-b pb-4">
              <h3 className="font-bold text-lg hover:text-blue-600 cursor-pointer">
                {article.title}
              </h3>
              <p className="text-sm text-gray-500 mt-1">{article.date}</p>
            </div>
          ))}
        </div>
        <button className="mt-6 text-blue-600 hover:underline">
          View All Articles →
        </button>
      </div>
    </div>
  );
}
