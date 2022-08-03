import Markdown from 'markdown-to-jsx';
import Image from 'next/image';
import { Button } from './Button.jsx';

const themeClassMap = {
  imgLeft: 'flex-row-reverse',
  imgRight: '',
};

export const Hero = ({ heading, body, button, image, theme }) => {
  return (
    <div className="px-12 py-24 bg-gray-100">
      <div className={`flex mx-auto max-w-6xl gap-12 ${themeClassMap[theme] ?? themeClassMap['imgRight']}`}>
        <div className="max-w-xl py-20 mx-auto lg:shrink-0">
          <h1 className="mb-6 text-5xl font-bold">{heading}</h1>
          <Markdown options={{ forceBlock: true }} className="mb-4 text-lg">
            {body}
          </Markdown>
          {button && <Button {...button} />}
        </div>
        <div className="relative hidden w-full overflow-hidden rounded-md lg:block">
          <Image src={`https:${image.file.url}`} alt={image} layout="fill" objectFit="cover" />
        </div>
      </div>
    </div>
  );
};
