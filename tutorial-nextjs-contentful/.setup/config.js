/**
 *
 */
module.exports = {
  files: {
    dependencies: ['glob', 'gray-matter'],
    templateFiles: ['utils/content.js', 'content/pages/index.md'],
  },
  contentful: {
    devDependencies: ['contentful-import', 'contentful-export'],
    dependencies: ['contentful'],
    templateFiles: ['contentful', 'utils/content.js', '.env', 'next.config.js'],
    scripts: {
      'contentful-export':
        'contentful-export --space-id $CONTENTFUL_SPACE_ID --management-token $CONTENTFUL_MANAGEMENT_TOKEN --config ./contentful/export-config.json',
      'contentful-import': 'node ./contentful/import.js',
    },
  },
};
