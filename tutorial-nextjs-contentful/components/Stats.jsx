import Markdown from 'markdown-to-jsx';

const themeClassMap = {
  primary: 'bg-purple-700 text-white',
  dark: 'bg-gray-800 text-white',
};

export const Stats = ({ heading, body, stats, theme }) => {
  return (
    <div className={`py-24 px-12 text-center ${themeClassMap[theme] ?? themeClassMap['primary']}`}>
      <div className="mx-auto">
        <div className="mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold mb-4">{heading}</h2>
          <Markdown className="sm:text-lg">{body}</Markdown>
        </div>
        <div className="grid gap-12 sm:grid-cols-3 max-w-3xl mx-auto">
          {stats.length > 0 && stats.map((stat, idx) => <StatItem key={idx} {...stat} />)}
        </div>
      </div>
    </div>
  );
};

const StatItem = ({ value, label }) => {
  return (
    <div>
      <div className="text-4xl sm:text-5xl font-bold mb-3">{value}</div>
      <div>{label}</div>
    </div>
  );
};
