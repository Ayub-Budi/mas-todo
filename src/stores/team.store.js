import { defineStore } from 'pinia';
import { axiosWrapper } from '@/helper/axios-wrapper.js';

const baseUrl = import.meta.env.VITE_BASE_URL;

export const useTeamStore = defineStore({
    id: 'team',
    state: () => ({
        teams: [],
        team: null,
    }),
    actions: {
        async fetch() {
            let url = `${baseUrl}/team`

            const teams = await axiosWrapper.get(url);

            if (teams) {
                this.teams = teams.data
            }
        },
        async add(data) {
          const team = await axiosWrapper.post(`${baseUrl}/team`, data, true);

          this.team = team.data

          return team
        },
        async delete(id) {
          return await axiosWrapper.delete(`${baseUrl}/team/${id}`, {}, true);
        },
    },
});
