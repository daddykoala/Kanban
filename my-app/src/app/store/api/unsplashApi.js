import { createApi } from 'unsplash-js';
import 'whatwg-fetch'

const unsplash = createApi({
  accessKey: 'd04Swa5TfxeubNkKKwsPkamqD0_UUCk-2fwOEoY1gcY'
,
  fetch: fetch,
});

export const getRandomImage = (argument1) => {
  return unsplash.photos.getRandom({ orientation: argument1, collections:"oeGtxTiSE60" });
};

