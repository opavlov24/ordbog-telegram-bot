import { load } from 'cheerio';

export class Sound {
  name: string;
  url: string;

  constructor(name: string, url: string) {
    this.name = name;
    this.url = url;
  }
}

export const parseSounds = async (html: string | undefined): Promise<Sound[]> => {
  const sounds = new Array();

  if (html == undefined) {
    return sounds;
  }

  const $ = load(html);
  $('.lydskrift').each((_, elm) => {
    $('audio a', elm).each((_, a) => {
      const url = $(a).attr('href');
      if (url != undefined) {
        sounds.push(new Sound($(elm).text(), url));
      }
    });
  });
  return sounds;
};
