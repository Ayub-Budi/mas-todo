import { defineStore } from "pinia";
import { axiosWrapper } from "@/helper/axios-wrapper.js";

const baseUrl = import.meta.env.VITE_BASE_URL;

export const useTeamStore = defineStore({
  id: "team",
  state: () => ({
    teams: [],
    team: null,
  }),
  actions: {
    async fetch(id) {
      let url = `${baseUrl}/team/${id}`;

      console.log(url);
      try {
        const response = await axiosWrapper.get(url);
        console.log("Response:", response);
        if (response && response.data) {
          this.teams = response.data;
          console.log("Teams updated:", this.teams);
        } else {
          console.error("No data found in response");
        }
      } catch (error) {
        console.error("Error fetching teams:", error);
      }
    },

    async add(data) {
      const team = await axiosWrapper.post(`${baseUrl}/team`, data, true);

      this.team = team.data;

      return team;
    },
    async delete(id) {
      return await axiosWrapper.delete(`${baseUrl}/team/${id}`, {}, true);
    },
  },
});
