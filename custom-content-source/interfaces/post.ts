import type Author from './author';
import type Asset from './asset';

interface PostType {
    id: string;
    slug: string;
    title: string;
    date?: string;
    coverImage?: Asset | null;
    author?: Author | null;
    excerpt?: string;
    ogImage?: Asset | null;
    content?: string;
}

export default PostType;
