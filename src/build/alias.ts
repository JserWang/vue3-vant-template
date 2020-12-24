const aliasMap = {
  '@/': '/src/',
};

export default (path: string) => {
  for (const [find, replacement] of Object.entries(aliasMap)) {
    if (path.startsWith(find)) {
      return path.replace(find, replacement);
    }
  }
};
