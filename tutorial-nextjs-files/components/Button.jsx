import Link from 'next/link';

const themeClassMap = {
  default: 'border-purple-700 bg-purple-700 text-white hover:bg-purple-500 hover:border-purple-500',
  outline: 'border-purple-700 bg-transparent text-purple-700 hover:text-purple-500 hover:border-purple-500',
};

export const Button = ({ label, url, theme }) => {
  return (
    <Link href={url}>
      <a
        className={`py-3 px-6 inline-block border-2 font-semibold rounded-md transition-all duration-300 ${
          themeClassMap[theme] ?? themeClassMap['default']
        }`}
      >
        {label}
      </a>
    </Link>
  );
};
