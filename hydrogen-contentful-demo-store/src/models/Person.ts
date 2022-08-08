export type Person = {
  id: string;
  firstName: string;
  lastName: string;
};

export type PersonRaw = Omit<Person, 'id'> & {
  sys: {
    id: string;
  };
};
