<template>
  <div class="ativos">
    <h1>Ativos</h1>
    <p>
      Cadastre, edite e exclua registros da tabela ATIVOS
    </p>
      <b-button v-b-modal.criaAtivo>
       <font-awesome-icon icon="plus" /> <span>Adicionar</span>
      </b-button>
    <b-table striped hover :items="ativos" :fields="fields">
        <template slot="cell(descricao)" slot-scope="{ item: { descricao } }">
          <p v-text="descricao">
          </p>
        </template>
        <template slot="cell(actionEditar)" slot-scope="{ item }">
          <b-button v-on:click="beforeEditarAtivo(item)">
            <font-awesome-icon icon="pen" />
          </b-button>
        </template>
        <template slot="cell(actionExcluir)" slot-scope="{ item }">
          <b-button v-on:click="beforeExcluirAtivo(item)">
            <font-awesome-icon icon="trash" />
          </b-button>
        </template>
      </b-table>
      <b-modal 
        id="criaAtivo"
        title="Nova ativo" 
        ok-title="Salvar" 
        cancel-title="Cancelar"
        @show="beforeNovaAtivo"
        @ok="saveNovaAtivo">
        <FormAtivo v-model="ativoAtual" />
      </b-modal>
      <b-modal 
        id="excluirAtivo"
        title="Deseja Excluir?" 
        ok-title="Excluir" 
        cancel-title="Cancelar"
        @ok="excluirAtivo">
        <FormAtivo v-model="ativoAtual" />
      </b-modal>
      <b-modal 
        id="editarAtivo"
        :title="'Alterar o ativo - ' + ativoAtual.codigo"
        ok-title="Alterar" 
        cancel-title="Cancelar"
        @ok="editarAtivo">
        <FormAtivo v-model="ativoAtual" />
       </b-modal>
  </div>
</template>

<script>
import FormAtivo from '../components/FormAtivo';
import axios from 'axios';

export default {
  components: {FormAtivo},
  data: () => {
        return {
            ativoAtual: {
              codigo:'',
              ativo: '',
              isNew: true
            },
            ativos: [],
            fields: [
              {
                key: 'codigo',
                label: 'Código',
              },
              {
                key: 'descricao',
                label: 'Descrição',
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

        beforeExcluirAtivo(ativo){
          this.ativoAtual = {
            codigo: ativo.codigo,
            descricao: ativo.descricao,
            isNew: false
          }
          this.$root.$emit('bv::show::modal','excluirAtivo');
      },
      async excluirAtivo() {
        let payload = {
            codigo: this.ativoAtual.codigo,
            descricao: this.ativoAtual.descricao
        };
        try{
          await axios.delete(`http://localhost:3000/ativos/${this.ativoAtual.codigo}`, payload);
          await this.carregaAtivos();
        }catch(err) {
          alert(this.ativoAtual.codigo)
        }
      },
      beforeEditarAtivo(ativo){
          this.ativoAtual = {
            codigo: ativo.codigo,
            descricao: ativo.descricao,
            isNew: false
          }
          this.$root.$emit('bv::show::modal','editarAtivo');
      },
      async editarAtivo(){
        let payload = {
            codigo: this.ativoAtual.codigo,
            descricao: this.ativoAtual.descricao
        };

        try {
                await axios.put(`http://localhost:3000/ativos/${this.ativoAtual.codigo}`, payload);
                await this.carregaAtivos();
            } catch(err) {
                alert('erro ao atualizar a ativo');
            }
      },
      async carregaAtivos(){
        this.ativos.splice(0, this.ativos.length);
        let dados = await axios.get('http://localhost:3000/ativos/');
        this.ativos.push(...dados.data);
      },
      beforeNovaAtivo() {
        this.ativoAtual.codigo = '';
        this.ativoAtual.descricao = '';
        this.ativoAtual.isNew = true;
      },
      async saveNovaAtivo() {
        let payload = {
          codigo: this.ativoAtual.codigo,
          descricao: this.ativoAtual.descricao
        };

        try{
          await axios.post('http://localhost:3000/ativos/', payload);
          await this.carregaAtivos();
        }catch(err) {
          alert('erro ao inserir o ativo')
        }
      }
  },
  async mounted() {
    await this.carregaAtivos();
  }
}
</script>