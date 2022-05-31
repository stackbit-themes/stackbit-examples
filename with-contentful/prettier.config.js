module.exports = {
    trailingComma: 'none',
    tabWidth: 4,
    overrides: [
        {
            files: ['*.css', '*.scss'],
            options: {
                tabWidth: 2,
                singleQuote: false
            }
        },
        {
            files: ['*.md', '*.markdown'],
            options: {
                tabWidth: 2
            }
        }
    ],
    semi: true,
    singleQuote: true,
    printWidth: 140
};
