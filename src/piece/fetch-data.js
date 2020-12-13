import { byId } from '@generative-music/pieces-alex-bainter';
import playTimeLoaded from './play-time-loaded';

const API_ENDPOINT = `${location.protocol}//api.generative.fm/v1`;

const fetchData = (store) =>
  fetch(`/api/playtime`)
    .then((resp) => resp.json())
    .then(({ Item }) => {
      const parsed = JSON.parse(Item.json.S);
      const fixed = Object.keys(parsed).reduce((o, oldId) => {
        const newId = oldId.replace('alex-bainter-', '');
        if (!byId[newId]) {
          return o;
        }
        o[newId] = parsed[oldId];
        return o;
      }, {});
      store.dispatch(playTimeLoaded(fixed));
    });

export default fetchData;
