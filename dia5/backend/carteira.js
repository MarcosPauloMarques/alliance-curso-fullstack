import {Router} from 'express';
import { Client } from 'pg';

const router = Router();

router.get('/', async (req, res) => {
    let resultado = [];
    const client = criaClient();

    await client.connect();
    let queryResult = await client.query("select CODIGO_ATIVO, QUANTIDADE, PRECO_MEDIO from public.CARTEIRA");
    for (let row of queryResult.rows) {
        resultado.push({
            codigo: row.codigoAtivo,
            quantidade: row.quantidade,
            precoMedio: row.precoMedio

        });
    }
    await client.end();

    res.send(JSON.stringify(resultado));
});


//Entrade é:
//payload = {nome, telefone, email, saldoCreditos}
router.post('/', async (req, res) => {
    let payload = req.body;
    let sql = `insert into CARTEIRA(CODIGO_ATIVO, QUANTIDADE, PRECO_MEDIO) VALUES
    ('${payload.codigo_ativo}','${payload.quantidade}','${payload.preco_medio})
    `;
    let sql2 = `insert into OPERACOES(ID, CODIGO_ATIVO, TIPO, PRECO, QUANTIDADE) VALUES
    (nextval('seq_operacoes_id'),'${payload.codigo_ativo}','C','${payload.preco}',
    '${payload.quantidade}',)
    `;
    
    const client = criaClient();
    await client.connect();
    await client.query(sql);
    await client.query(sql2);
    await client.end();

    res.status(201);
    res.send();

});

router.put('/:codigo', async (req, res) => {
    let codigo_ativo = req.params.codigo_ativo;
    let payload = req.body;

    
    let sql = `insert into OPERACOES(ID, CODIGO_ATIVO, TIPO, PRECO, QUANTIDADE, LUCRO_PREJUIZO) VALUES
    (nextval('seq_operacoes_id'),'${payload.codigo_ativo}','V','${payload.preco}',
    '${payload.quantidade}','0')`;
    
    let sql2 = `update CARTEIRA SET 
    QUANTIDADE = QUANTIDADE - '${payload.quantidade}',
    PRECO_MEDIO =  '${payload.preco_medio}'
    where
    CODIGO_ATIVO = ${codigo_ativo} `;

//    let sql = `insert into OPERACOES(ID, CODIGO_ATIVO, TIPO, PRECO, QUANTIDADE) VALUES
//    (nextval('seq_operacoes_id'),'${payload.codigo_ativo}','C','${payload.preco}',
//    '${payload.quantidade}')`;
    
//    let sql2 = `update CARTEIRA SET 
//    QUANTIDADE = QUANTIDADE + '${payload.quantidade}',
//    PRECO_MEDIO =  ((QUANTIDADE * PRECO_MEDIO) + ('${payload.quantidade}' * '${payload.preco_medio}'))
//     / (QUANTIDADE + '${payload.quantidade}'),
//    where
//    CODIGO_ATIVO = ${codigo_ativo} `;


    const client = criaClient();
    await client.connect();
    await client.query(sql);
    await client.query(sql2);
    await client.end();

    res.status(201);
    res.send();
});


function criaClient() {
    return new Client({
        user: 'dia3',
        host: 'localhost',
        database: 'db_dia3',
        password: '1234',
        port: 5432
    });
}

export default router;