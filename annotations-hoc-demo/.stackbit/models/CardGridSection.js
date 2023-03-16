module.exports = {
  label: 'Card Grid',
  labelField: 'heading',
  groups: ['SectionComponents'],
  fields: [
    { type: 'string', name: 'heading', default: 'Card Grid Heading' },
    { type: 'markdown', name: 'subheading', default: 'Card Grid Subheading' },
    { type: 'list', name: 'cards', items: { type: 'model', models: ['Card'] } },
  ],
};
