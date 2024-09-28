import { defineStore } from 'pinia';
import { axiosWrapper } from '@/helper/axios-wrapper.js';

const baseUrl = import.meta.env.VITE_BASE_URL;

export const usePeojectStore = defineStore({
    id: 'project',
    state: () => ({
        projects: [],
        project: null,

    }),
    actions: {
        async fetch() {
            let url = `${baseUrl}/project`

            const projects = await axiosWrapper.get(url);

            if (projects) {
                this.projects = projects.data
            }
        },

        async add(data) {
            const project = await axiosWrapper.post(`${baseUrl}/project`, data, true);
  
            this.project = project.data
  
            return project
          },

          async detail(id) {
            try {
                let url = `${baseUrl}/project`;
                const response = await axiosWrapper.get(url);
    
                console.log("Full response data:", response.data); 
        
        
                if (response && response.data) {
                    // Filter proyek berdasarkan ID yang diberikan
                    this.project = response.data.find(project => project.id === id);
        
                    // Menampilkan proyek yang ditemukan di konsol
                    console.log("Filtered project:", this.project);
        
                    // Jika proyek tidak ditemukan, Anda dapat menampilkan pesan atau mengatur nilai default
                    if (!this.project) {
                        console.warn(`Project with ID ${id} not found.`);
                    }
                } else {
                    console.error("No projects found or response is empty.");
                }
            } catch (error) {
                console.error("Error fetching project details:", error);
            }
        }        
    },
});
