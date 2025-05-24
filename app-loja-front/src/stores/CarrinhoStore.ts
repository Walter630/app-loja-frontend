import { defineStore } from 'pinia';
import api from '@/services/api'; // <-- usa a instância com token
import { useUserStore } from './UserStore';

export interface ItemCarrinho {
  id: string;
  carrinhoId: string;
  produtoId: string;
  quantidade: number;
  produto?: {
    id: string;
    nome: string;
    valor: number;
    imagem: string;
  };
}

export interface Carrinho {
  id: string;
  userId: string;
  data_criacao: string;
}

export const useCarrinhoStore = defineStore('carrinho', {
  state: () => ({
    carrinho: null as Carrinho | null,
    items: [] as ItemCarrinho[],
    erro: '',
  }),

  actions: {
    async CarregarCarrinho(): Promise<Carrinho | null> {
  const userId = await this.esperarUsuarioLogado();

  if (!userId) {
    console.warn("ID do usuário não encontrado ao carregar carrinho.");
    return null;
  }

  try {
    const res = await api.get(`/carrinho/usuario/${userId}`);
    this.carrinho = res.data.carrinho;
    this.items = res.data.items || [];
    return this.carrinho;
  } catch (err: any) {
    if (err.response && err.response.status === 404) {
      console.log("Carrinho não encontrado. Criando um novo...");
      try {
        const res = await api.post("/carrinho", { userId });
        this.carrinho = res.data;
        this.items = [];
        return this.carrinho; // <-- RETORNA carrinho criado
      } catch (erroCriar: any) {
        console.error('Erro ao criar carrinho:', erroCriar.response?.data || erroCriar.message);
        this.erro = 'Erro ao criar carrinho';
        return null;
      }
    } else {
      console.error('Erro ao buscar o carrinho:', err.response?.data || err.message);
      this.erro = 'Erro ao buscar carrinho';
      return null;
    }
  }
},

    async esperarUsuarioLogado(timeout = 5000): Promise<string | undefined> {
  const userStore = useUserStore();

  return new Promise((resolve) => {
    const start = Date.now();

    const intervalo = setInterval(() => {
      const userId = userStore.usuarioLogado?.id;
      if (userId) {
        clearInterval(intervalo);
        resolve(userId);
      } else if (Date.now() - start > timeout) {
        console.warn("Tempo limite ao esperar pelo usuário logado.");
        clearInterval(intervalo);
        resolve(undefined);
      }
    }, 100);
  });
},


    async AdicionarItem(produtoId: string, quantidade = 1) {
  console.log("AdicionarItem chamado com:", produtoId, quantidade);

  const userId = await this.esperarUsuarioLogado();
  console.log("[CarrinhoStore] userId detectado:", userId);

  if (!userId) {
    console.warn("ID do usuário não encontrado ao adicionar item.");
    return;
  }

  const carrinho = await this.CarregarCarrinho(); // Aguarda e recebe o carrinho

  if (!carrinho?.id) {
    console.warn('Carrinho ainda não foi inicializado corretamente.');
    return;
  }

  try {
    console.log("Carrinho ID (URL):", carrinho.id);
    
    const response = await api.post(
      `/carrinho/${carrinho.id}/item`,
      { produtoId, quantidade }
    );

    this.items.push(response.data);
  } catch (error: any) {
    console.error('Erro ao adicionar item no carrinho:', error.response?.data || error.message);
    this.erro = 'Erro ao adicionar item';
  }
},


    async removerItem(itemId: string) {
      try {
        await api.delete(`/carrinho/item/${itemId}`);
        this.items = this.items.filter(item => item.id !== itemId);
      } catch (error: any) {
        console.error('Erro ao remover item do carrinho:', error.response?.data || error.message);
        this.erro = 'Erro ao remover item';
      }
    },

    async limparCarrinho() {
      try {
        if (!this.carrinho?.id) return;
        await api.delete(`/carrinho/${this.carrinho.id}/limpar`);
        this.items = [];
      } catch (error: any) {
        console.error('Erro ao limpar o carrinho:', error.response?.data || error.message);
        this.erro = 'Erro ao limpar carrinho';
      }
    },
    
  },
  
});
