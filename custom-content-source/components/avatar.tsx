import type Author from '../interfaces/author';

type Props = {
    author: Author;
};

const Avatar = ({ author: { name, picture } }: Props) => {
    return (
        <div className="flex items-center" data-sb-field-path=".author">
            {picture && (
                <img
                    src={picture.url}
                    width={picture.width}
                    height={picture.height}
                    className="w-12 h-12 rounded-full mr-4"
                    alt={name}
                    data-sb-field-path=".picture"
                />
            )}
            <div className="text-xl font-bold" data-sb-field-path=".name">
                {name}
            </div>
        </div>
    );
};

export default Avatar;
