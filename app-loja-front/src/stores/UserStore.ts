// src/stores/userStore.ts
import { defineStore } from 'pinia'
import axios from 'axios'

const API = 'http://localhost:3000/user'

export const useUserStore = defineStore('user', {
  state: () => ({
    usuarios: [] as any[],
    usuarioLogado: null as any,
    loading: false,
    erro: '',
  }),

  actions: {
    async fetchUsuarios() {
      this.loading = true
      try {
        const res = await axios.get(`${API}/`) // ajuste conforme seu endpoint
        this.usuarios = res.data
      } catch (err: any) {
        this.erro = err.message
      } finally {
        this.loading = false
      }
    },

    async login(email: string, senha: string) {
      this.loading = true
      try {
        const res = await axios.post(`${API}/login`, { email, senha })
        this.usuarioLogado = res.data.usuario
        localStorage.setItem('token', res.data.token)
      } catch (err: any) {
        this.erro = err.response?.data?.message || 'Erro ao fazer login'
      } finally {
        this.loading = false
      }
    },

    logout() {
      this.usuarioLogado = null
      localStorage.removeItem('token')
    }
  },
})
