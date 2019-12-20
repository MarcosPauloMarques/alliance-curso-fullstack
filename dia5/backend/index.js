import express from 'express';
import cors from 'cors';

import Usuarios from './usuarios';
import Bicicletas from './bicicletas';
import Ativos from './ativos';
import Carteira from './carteira';

    const app = express();
    
    app.use(cors());
    app.use(express.json());

    app.use('/usuarios', Usuarios);
    app.use('/bicicletas', Bicicletas);
    app.use('/ativos', Ativos);
    app.use('/carteira', Carteira);

    app.listen(3000, () =>
        console.log('Servidor rodando na porta 3000!'),
    );

