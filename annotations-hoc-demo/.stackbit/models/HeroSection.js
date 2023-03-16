module.exports = {
  label: 'Hero',
  labelField: 'heading',
  groups: ['SectionComponents'],
  fields: [
    { type: 'string', name: 'heading', default: 'Hero Heading' },
    { type: 'markdown', name: 'subheading', default: 'Hero Subheading' },
    {
      type: 'list',
      name: 'buttons',
      items: { type: 'model', models: ['Button'] },
    },
  ],
};
