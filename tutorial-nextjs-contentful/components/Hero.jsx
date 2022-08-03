import Markdown from 'markdown-to-jsx';
import Image from 'next/image';
import { Button } from './Button.jsx';

const themeClassMap = {
  imgLeft: 'flex-row-reverse',
  imgRight: '',
};

export const Hero = ({ heading, body, button, image, theme }) => {
  return (
    <div className="py-24 px-12 bg-gray-100">
      <div className={`flex mx-auto max-w-6xl gap-12 ${themeClassMap[theme] ?? themeClassMap['imgRight']}`}>
        <div className="mx-auto max-w-xl lg:shrink-0 py-20">
          <h1 className="mb-6 text-5xl font-bold">{heading}</h1>
          <Markdown className="text-lg mb-4">{body}</Markdown>
          {button && <Button {...button} />}
        </div>
        <div className="relative w-full hidden lg:block rounded-md overflow-hidden">
          <Image src={image} alt={image} layout="fill" objectFit="cover" />
        </div>
      </div>
    </div>
  );
};
