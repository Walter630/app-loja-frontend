// src/stores/userStore.ts
import { defineStore } from 'pinia'
import axios from 'axios'

const API = 'http://localhost:3000/user'

export const useUserStore = defineStore('user', {
  state: () => ({
    usuarios: [] as any[],
    usuarioLogado: null as any,
    isAutenticate: false,
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

    async login(cpf: string, senha: string) {
      this.loading = true
      
      try {
        const res = await axios.post(`${API}/login`, { cpf, senha })
        this.usuarioLogado = res.data.usuario
        localStorage.setItem('token', res.data.token)
        
      } catch (err: any) {
        this.erro = err.response?.data?.message || 'Erro ao fazer login'
      } finally {
        this.loading = false
      }
    },

    verificarToken() {
      const token = localStorage.getItem('token')
      if(token){
        this.isAutenticate = true
        // aqui você pode futuramente decodificar o token e preencher usuarioLogado
      }else{
        this.isAutenticate = false, 
        this.usuarioLogado = null
      }
    },

    logout() {
      this.usuarioLogado = null
      localStorage.removeItem('token')
      this.isAutenticate = false
    },

    async cadastrar(nome: string, cpf: string, senha: string){
      this.loading  = true;
      try{
        const res = await axios.post(API, {nome, cpf, senha})
        await this.fetchUsuarios()
        return res.data
      }catch(err: any){
        this.erro = err.response?.data?.message || 'Erro ao cadastrar usuário'
      }finally{
        this.loading = false
      }

    }
  },
})
