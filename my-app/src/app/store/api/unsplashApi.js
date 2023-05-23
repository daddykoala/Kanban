import { createApi } from 'unsplash-js';
import 'whatwg-fetch'

const unsplash = createApi({
  accessKey: 'd04Swa5TfxeubNkKKwsPkamqD0_UUCk-2fwOEoY1gcY'
,
  fetch: fetch,
});

export const getRandomImage = () => {
  return unsplash.photos.getRandom({ orientation: 'portrait' });
};

export const getRandomImagePortrait = () => {
    return unsplash.photos.getRandom({ orientation: 'portrait' });
  };