import Markdown from 'markdown-to-jsx';

export function Footer({ multiBrandConfig }) {
  return (
    <div className="bg-dark text-verylight px-5 py-4 flex items-center gap-6" data-sb-object-id={multiBrandConfig.id}>
      {multiBrandConfig.footerText && (
        <Markdown className="text-md font-bold footer-text">{multiBrandConfig.footerText}</Markdown>
      )}
    </div>
  );
}
