// src/stores/roupasStore.ts
import { defineStore } from 'pinia'
import axios from 'axios'

export interface Roupa {
  id: string;
  nome: string;
  preco: number;
  descricao: string;
  categoria: string;
  imagem: string;
}

export const useRoupasStore = defineStore('roupas', {
  state: () => ({
    roupas: [] as Roupa[],
    loading: false,
    erro: null as string | null,
  }),

  actions: {
    async fetchRoupas() {
      this.loading = true
      this.erro = null
      try {
        const res = await axios.get<Roupa[]>('http://localhost:3000/itemRoupa')
        this.roupas = res.data
      } catch (error: any) {
        console.error('Erro ao buscar todos:', error.response?.data || error.message)
        this.erro = 'Erro ao buscar roupas'
      } finally {
        this.loading = false
      }
    },

    async criarRoupa(data: Omit<Roupa, 'id'>) {
      this.erro = null
      try {
        const response = await axios.post<Roupa>('http://localhost:3000/itemroupas', data)
        this.roupas.push(response.data)
      } catch (error: any) {
        console.error('Erro ao adicionar roupa:', error.response?.data || error.message)
        this.erro = 'Erro ao adicionar roupa'
      }
    },

    async updateRoupa({ id, data }: {id: string; data: Partial<Roupa>}) {
      this.loading = true
      try {
        const response = await axios.put<Roupa>(`http://localhost:3000/itemroupas/${id}`, data)
        const index = this.roupas.findIndex((roupa) => roupa.id === id)
        if (index !== -1) {
          this.roupas[index] = response.data
        }
      } catch (error: any) {
        console.error('Erro ao atualizar roupa:', error.response?.data || error.message)
        this.erro = 'Erro ao atualizar roupa'
      } finally {
        this.loading = false
      }
    },
     async deleteRoupa(id: string) {
        this.erro = null
        try {
            await axios.delete(`http://localhost:3000/itemroupas/user/${id}`)
            this.roupas = this.roupas.filter((roupa) => roupa.id !== id)
        } catch (error: any) {
            console.error('Erro ao deletar roupa:', error.response?.data || error.message)
            this.erro = 'Erro ao deletar roupa'
        }
        }

  },
})
