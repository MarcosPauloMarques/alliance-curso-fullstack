<template>
  <div class="Carteira">
    <h1>Carteira</h1>
    <p>
      Cadastre sua CARTEIRA, compre e venda ações
    </p>
      <b-button v-b-modal.criaCarteira>
       <font-awesome-icon icon="plus" /> <span>Adicionar</span>
      </b-button>
    <b-table striped hover :items="carteira" :fields="fields">
        <template slot="cell(quantidade)" slot-scope="{ item: { quantidade} }">
          <p v-text="quantidade">
          </p>
        </template>
        <template slot="cell(precoMedio)" slot-scope="{ item: { precoMedio } }">
          <p v-text="precoMedio">
          </p>
        </template>
        <template slot="cell(actionEditar)" slot-scope="{ item }">
          <b-button v-on:click="beforeEditarCarteira(item)">
            <font-awesome-icon icon="pen" />
          </b-button>
        </template>
        <template slot="cell(actionExcluir)" slot-scope="{ item }">
          <b-button v-on:click="beforeExcluirCarteira(item)">
            <font-awesome-icon icon="trash" />
          </b-button>
        </template>
      </b-table>
      <b-modal 
        id="criaCarteira"
        title="Nova Carteira" 
        ok-title="Salvar" 
        cancel-title="Cancelar"
        @show="beforeNovaCarteira"
        @ok="saveNovaCarteira">
        <FormCarteira v-model="carteiraAtual" />
      </b-modal>
      <b-modal 
        id="excluirCarteira"
        title="Deseja Excluir?" 
        ok-title="Excluir" 
        cancel-title="Cancelar"
        @ok="excluirCarteira">
        <FormCarteira v-model="carteiraAtual" />
      </b-modal>
      <b-modal 
        id="editarCarteira"
        :title="'Alterar o carteira - ' + carteiraAtual.codigo"
        ok-title="Alterar" 
        cancel-title="Cancelar"
        @ok="editarCarteira">
        <FormCarteira v-model="carteiraAtual" />
       </b-modal>
  </div>
</template>

<script>
import FormCarteira from '../components/FormCarteira';
import axios from 'axios';

export default {
  components: {FormCarteira},
  data: () => {
        return {
            carteiraAtual: {
          codigoAtivo: '',
          quantidade: '',
          precoMedio: '',
          isNew: true
              
            },
            carteira: [],
            fields: [
              {
                key: 'codigo',
                label: 'Código',
              },
              {
                key: 'quantidade',
                label: 'Quantidade',
              },
              {
                key: 'precoMedio',
                label: 'Preço Medio',
              },
              {
                key: 'actionEditar',
                label: '',
              },
              {
                key: 'actionExcluir',
                label: '',
              }
              
            ]

        }
    },

    methods: {

        beforeExcluirCarteira(carteira){
          this.carteiraAtual = {
          codigoAtivo: carteira.codigoAtivo,
          quantidade: carteira.quantidade,
          precoMedio: carteira.precoMedio,
          isNew: carteira.isNew = false

          }
          this.$root.$emit('bv::show::modal','excluirCarteira');
      },
      async excluirCarteira() {
        let payload = {
            codigo: this.carteiraAtual.codigo,
            descricao: this.carteiraAtual.descricao,
        };
        try{
          await axios.delete(`http://localhost:3000/carteira/${this.carteiraAtual.codigo}`, payload);
          await this.carrega();
        }catch(err) {
          alert(this.carteiraAtual.codigo)
        }
      },
      beforeEditarCarteira(carteira){
          this.carteiraAtual = {
            codigo: carteira.codigo,
            descricao: carteira.descricao,
            isNew: false
          }
          this.$root.$emit('bv::show::modal','editarCarteira');
      },
      async editarCarteira(){
        let payload = {
            codigo: this.carteiraAtual.codigo,
            descricao: this.carteiraAtual.descricao
        };

        try {
                await axios.put(`http://localhost:3000/carteira/${this.carteiraAtual.codigo}`, payload);
                await this.carregaCarteira();
            } catch(err) {
                alert('erro ao atualizar a carteira');
            }
      },
      async carregaCarteira(){
        this.carteira.splice(0, this.carteira.length);
        let dados = await axios.get('http://localhost:3000/carteira/');
        this.carteira.push(...dados.data);
      },
      beforeNovaCarteira() {
        this.carteiraAtual.codigoAtivo = '';
        this.carteiraAtual.quantidade = '';
        this.carteiraAtual.precoMedio = '';
        this.carteiraAtual.isNew = true;
      },
      async saveNovaCarteira() {
        let payload = {
          codigoAtivo: this.carteiraAtual.codigoAtivo,
          quantidade: this.carteiraAtual.quantidade,
          precoMedio: this.carteiraAtual.precoMedio
        };

        try{
          await axios.post('http://localhost:3000/carteira/', payload);
          await this.carregaCarteira();
        }catch(err) {
          alert('erro ao inserir o carteira')
        }
      }
  },
  async mounted() {
    await this.carregaCarteira();
  }
}
</script>