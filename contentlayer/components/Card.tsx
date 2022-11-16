import * as React from 'react';
import Link from 'next/link';
import * as types from 'contentlayer/generated';

export const Card: React.FC<types.Card> = (props) => {
  return (
    <Link
      href={props.url ?? '/'}
      className="card"
      data-sb-field-path={props['data-sb-field-path']}
    >
      {props.heading && (
        <h3 className="card-heading" data-sb-field-path=".heading">
          {props.heading}
        </h3>
      )}
      {props.subheading && (
        <div
          dangerouslySetInnerHTML={{ __html: props.subheading.html }}
          className="card-subheading"
          data-sb-field-path=".subheading"
        />
      )}
    </Link>
  );
};
