import fetch from 'node-fetch';

const isTrustedDomain = (url: string): boolean => {
  return url.startsWith('https://ordnet.dk/ddo/ordbog');
};

export const downloadHtml = async (url: string): Promise<string | undefined> => {
  if (!isTrustedDomain(url)) {
    return undefined;
  }

  return (await fetch(url)).text();
};
