module.exports = {
  type: 'page',
  urlPath: '/{slug}',
  hideContent: true,
  fields: [
    {
      type: 'string',
      name: 'title',
      default: 'This is a new page',
      required: true,
    },
    {
      type: 'list',
      name: 'sections',
      items: { type: 'model', groups: ['SectionComponents'] },
    },
  ],
};
