<template>
    <b-form>
        <b-form-group
            id="input-codigo"
            label="Código"
            label-for="txtCodigo"
            description="Informe o código único do ativo"
            :disabled="!content.isNew"
        >
            <b-form-input
                id="txtCodigo"
                v-model="content.codigo"
                type="text"
                required
                placeholder="código do ativo"
                @input="handleInput"
                :disabled="!content.isNew"/>
        </b-form-group>
        <b-form-group
            id="input-quantidade"
            label="Quantidade"
            label-for="txtQuantidade"
            description="Digite a quantidade"
        >
            <b-form-input
                id="txtQuantidade"
                v-model="content.quantidade"
                type="text"
                required
                placeholder=""
                @input="handleInput"/>
        </b-form-group>
        <b-form-group
            id="input-PrecoMedio"
            label="Preço Medio"
            label-for="txtPrecoMedio"
            description="Digite o Preço Medio"
        >
            <b-form-input
                id="txtPrecoMedio"
                v-model="content.precomedio"
                type="text"
                required
                placeholder=""
                @input="handleInput"/>
        </b-form-group>
    </b-form>
</template>

<script>
export default {
    props: ['value'],
    data () {
        return {
            content: {
                codigo: this.value.codigo,
                quantidade: this.value.quantidade,
                precoMedio: this.value.precoMedio,
                isNew: this.value.isNew
            }

        }
    },
    methods: {
        handleInput () {
            let retorno = {
                codigoAtivo: this.content.codigo,
                quantidade: this.content.quantidade,
                precoMedio: this.content.precoMedio,
                isNew: this.content.isNew
            };
            this.$emit('input', retorno);
        }
    }
}
</script>