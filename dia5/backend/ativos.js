import {Router} from 'express';
import { Client } from 'pg';

const router = Router();

router.get('/', async (req, res) => {
    let resultado = [];
    const client = criaClient();

    await client.connect();
    let queryResult = await client.query("select CODIGO, DESCRICAO from public.ATIVOS");
    for (let row of queryResult.rows) {
        resultado.push({
            codigo: row.codigo,
            descricao: row.descricao

        });
    }
    await client.end();

    res.send(JSON.stringify(resultado));
});

//Entrade é:
//payload = {nome, telefone, email, saldoCreditos}
router.post('/', async (req, res) => {
    let payload = req.body;
    let sql = `insert into ATIVOS(CODIGO, DESCRICAO) VALUES
    ('${payload.codigo}','${payload.descricao}')
    `;
    
    const client = criaClient();
    await client.connect();
    await client.query(sql);
    await client.end();

    res.status(201);
    res.send();

});

router.put('/:codigo', async (req, res) => {
    let codigo = req.params.codigo;
    let payload = req.body;

    let sql = `update ATIVOS SET 
    DESCRICAO = '${payload.descricao}'
    where
    CODIGO = '${codigo}' `;
    const client = criaClient();
    await client.connect();
    await client.query(sql);
    await client.end();

    res.status(204);
    res.send();
});


router.delete('/:codigo', async (req, res) => {
    let codigo = req.params.codigo;
    let payload = req.body;
    let sql = `delete from CARTEIRA
    where
    CODIGO_ATIVO = '${codigo}' `;
    let sql2 = `delete from OPERACOES
    where
    CODIGO_ATIVO = '${codigo}' `;
    let sql3 = `delete from ATIVOS
    where
    CODIGO = '${codigo}' `;

    const client = criaClient();
    await client.connect();
    await client.query(sql);
    await client.query(sql2);
    await client.query(sql3);
    await client.end();

    res.status(204);
    res.send();
})

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