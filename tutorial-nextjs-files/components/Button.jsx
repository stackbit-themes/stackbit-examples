import Link from 'next/link';

const themeClassMap = {
  default: 'border-black bg-black text-white',
  outline: 'border-black bg-transparent text-black',
};

export const Button = ({ label, url, theme }) => {
  console.log(theme);
  return (
    <Link href={url}>
      <a
        className={`py-3 px-6 inline-block border-2 font-semibold rounded-md hover:opacity-50 transition-all duration-300 ${
          themeClassMap[theme] ?? themeClassMap['default']
        }`}
      >
        {label}
      </a>
    </Link>
  );
};
