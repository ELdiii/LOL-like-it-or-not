import axios from "axios";

export default axios.create({
  baseURL: "https://ddragon.leagueoflegends.com/api/",
});
