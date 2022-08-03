import {Person, PersonRaw} from './Person';

export type Article = {
  id: string;
  title: string;
  date: string;
  author?: Person;
  slug: string;
  content: string;
  image: {
    url: string;
    title: string;
  };
};

export type ArticleRaw = Omit<Article, 'id' | 'author'> & {
  sys: {
    id: string;
  };
  author: PersonRaw;
};
