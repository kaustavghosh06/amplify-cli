module.exports = {
  name: 'play',
  alias: ['manage'],
  run: async (context) => {
    await context.amplify.openPlayground();
  },
};
