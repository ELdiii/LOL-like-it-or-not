import axios from "axios";

export default axios.create({
  baseURL: "http://ddragon.leagueoflegends.com/cdn/12.19.1/data/en_US/",
});
