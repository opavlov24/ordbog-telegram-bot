import { Sound, parseSounds } from './model/sound.js';
import { downloadHtml } from './model/ordbog.js';

export const extractSounds = async (url: string): Promise<Sound[]> => {
  return await downloadHtml(url).then((html) => parseSounds(html));
};
