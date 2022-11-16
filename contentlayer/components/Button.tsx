import * as React from 'react';
import Link from 'next/link';
import * as types from 'contentlayer/generated';

export const Button: React.FC<types.Button> = (props) => {
  return (
    <Link
      href={props.url ?? '/'}
      className={`button theme-${props.theme}`}
      data-sb-field-path={props['data-sb-field-path']}
    >
      <span data-sb-field-path=".label">{props.label}</span>
    </Link>
  );
};
