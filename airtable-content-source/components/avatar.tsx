import type Author from '../interfaces/author';

type Props = {
  author: Author;
};

const Avatar = ({ author: { name, picture } }: Props) => {
  return (
    <div className="flex items-center" data-sb-field-path=".Author">
      {picture && (
        <img
          src={picture.url}
          width={picture.width}
          height={picture.height}
          className="w-12 h-12 mr-4 rounded-full"
          alt={name}
          data-sb-field-path=".Picture"
        />
      )}
      <div className="text-xl font-bold" data-sb-field-path=".Name">
        {name}
      </div>
    </div>
  );
};

export default Avatar;
