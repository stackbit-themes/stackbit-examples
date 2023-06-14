import Asset from './asset';

interface Author {
    id: string;
    name: string;
    picture?: Asset | null;
}

export default Author;
