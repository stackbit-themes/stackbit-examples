module.exports = {
  labelField: 'heading',
  fields: [
    { type: 'string', name: 'heading', default: 'Card Heading' },
    {
      type: 'markdown',
      name: 'subheading',
      default: 'Card description goes here ...',
    },
    { type: 'string', name: 'url', label: 'URL', default: '/' },
  ],
};
