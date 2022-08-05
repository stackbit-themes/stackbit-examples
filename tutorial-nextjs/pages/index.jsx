export default function PlaceholderPage() {
  return (
    <div className="px-8 py-16">
      <div className="max-w-xl mx-auto">
        <h1 className="mb-6 text-6xl">Stackbit Tutorial</h1>
        <p className="mb-8 text-xl">To get started, run the following command:</p>
        <pre className="p-4 mb-8 bg-gray-100 rounded-sm">npm run setup [SOURCE]</pre>
        <p className="mb-4 text-xl">
          Where <code>[SOURCE]</code> is one of the following:
        </p>
        <ul className="ml-4 list-disc">
          <li className="mb-2">
            <code>files</code>
          </li>
          <li>
            <code>contentful</code>
          </li>
        </ul>
      </div>
    </div>
  );
}
