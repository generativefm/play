//const API_ENDPOINT = `${location.protocol}//stats.api.generative.fm/v1/global/playtime`;
const API_ENDPOINT = `http://localhost:8080/api/playtime`;

const fetchData = () =>
  fetch(API_ENDPOINT)
    .then((resp) => resp.json())
    .then((json) => {
      return json;
    });

export default fetchData;
