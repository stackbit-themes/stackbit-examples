import Link from 'next/link';

const themeClassMap = {
  default: 'border-dark bg-dark text-verylight hover:bg-verydark',
  outline: 'border-dark bg-verylight text-dark hover:bg-light hover:border-superdark',
};

export const Button = (props) => {
  return (
    <Link
      href={props.url}
      className={`py-3 px-6 inline-block border-2 font-semibold rounded-md transition-all duration-300 ${
        themeClassMap[props.theme] ?? themeClassMap['default']
      }`}
      data-sb-object-id={props.id}
    >
      <span data-sb-field-path="label">{props.label}</span>
    </Link>
  );
};
