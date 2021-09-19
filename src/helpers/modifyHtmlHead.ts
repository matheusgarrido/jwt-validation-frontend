export const changeTitle = (pageName: string): void => {
  let title = 'SMARTUSER';
  if (pageName) title = `${title} | ${pageName}`;
  document.title = title;
};
