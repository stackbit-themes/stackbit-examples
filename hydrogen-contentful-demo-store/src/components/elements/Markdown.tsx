import * as React from 'react';
import {marked} from 'marked';
import sanitizeHtml from 'sanitize-html';

type Props = React.ComponentPropsWithRef<'div'>;

export const Markdown = React.forwardRef<HTMLDivElement, Props>(
  (props, ref) => {
    const {children, ...restProps} = props;
    const markdown = sanitizeHtml(marked(children?.toString() ?? ''));
    return (
      <div
        ref={ref}
        dangerouslySetInnerHTML={{__html: markdown}}
        {...restProps}
      />
    );
  },
);
