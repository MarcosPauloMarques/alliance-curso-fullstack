<template>
  <div class="usuarios">
    <h1>Usuarios</h1>
    <p>
      Pagina com informações sobre a tabela:[Usuarios]
    </p>
    <b-table striped hover :items="usuarios" :fields="fields">
        <template slot="cell(ativo)" slot-scope="{ item: { ativo } }">
            <font-awesome-icon :icon="ativo === 'Y' ? 'check' : 'times'"/>
        </template>
        <template slot="cell(actionExcluir)" slot-scope="{ item: { codigo } }">
          <b-button v-on:click="excluirUsuario(codigo)">
            <font-awesome-icon icon="trash" />
          </b-button>
        </template>
        <template slot="cell(actionEditar)" slot-scope="{ item: { codigo } }">
          <b-button v-on:click="editarUsuario(codigo)">
            <font-awesome-icon icon="pen" />
          </b-button>
        </template>
      </b-table>
  </div>
</template>

<script>
export default {
  data: () => {
        return {
            bicicletas: [
                {"codigo":"XXDDEE224411","ativo":"N"}
            ],
            fields: [
              {
                key: 'codigo',
                label: 'Código',
              },
              {
                key: 'ativo',
                label: 'Ativo?',
              },
              {
                key: 'actionExcluir',
                label: '',
              },
              {
                key: 'actionEditar',
                label: '',
              }
              
            ]

        }
    },

    methods: {
      excluirBicicleta(codigo){
        return codigo;
      },
      editarBicicleta(codigo){
        return codigo;
      }
    }
  }
</script>