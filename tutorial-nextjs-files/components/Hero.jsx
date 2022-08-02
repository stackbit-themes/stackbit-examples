import Markdown from 'markdown-to-jsx';
import Image from 'next/image';
import { Button } from './Button.jsx';

const themeClassMap = {
  imgLeft: 'flex-row-reverse',
  imgRight: '',
};

export const Hero = ({ heading, body, actions, image, theme }) => {
  return (
    <div className="py-16 px-12 bg-gray-100">
      <div className={`flex mx-auto max-w-6xl gap-12 ${themeClassMap[theme] ?? themeClassMap['imgRight']}`}>
        <div className="max-w-xl shrink-0 py-20">
          <h1 className="mb-6 text-5xl font-bold">{heading}</h1>
          <Markdown className="text-lg mb-4">{body}</Markdown>
          {actions.length > 0 && actions.map((action, idx) => <Button key={idx} {...action} />)}
        </div>
        <div className="relative w-full">
          <Image src={image} alt={image} layout="fill" objectFit="cover" />
        </div>
      </div>
    </div>
  );
};
