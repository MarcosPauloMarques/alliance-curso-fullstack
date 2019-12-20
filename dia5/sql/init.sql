-- Cria o usuário para a aplicação
CREATE ROLE dia3 WITH
	LOGIN
	SUPERUSER
	CREATEDB
	CREATEROLE
	INHERIT
	NOREPLICATION
	CONNECTION LIMIT -1;

-- DROP DATABASE db_dia3;

CREATE DATABASE db_dia3˙
    WITH
    OWNER = dia3
    ENCODING = 'UTF8'
    CONNECTION LIMIT = -1;

COMMENT ON DATABASE db_dia3
    IS 'Banco de dados do terceiro dia de treinamento';

CREATE TABLE public.BICICLETAS
(
    CODIGO character(12) NOT NULL,
    ATIVO character(1) NOT NULL,
    PRIMARY KEY (CODIGO)
);

ALTER TABLE public.BICICLETAS
    OWNER to dia3;

CREATE TABLE public.USUARIOS
(
    CODIGO numeric(10, 0) NOT NULL,
    NOME character(60) NOT NULL,
    TELEFONE character(15),
    EMAIL character(100),
    SALDO_CREDITOS numeric(12, 2) NOT NULL,
    PRIMARY KEY (CODIGO)
);

ALTER TABLE public.USUARIOS
    OWNER to dia3;

CREATE TABLE public.VIAGENS
(
    ID numeric(10) NOT NULL,
    CODIGO_USUARIO numeric(10) NOT NULL,
    CODIGO_BICICLETA character(12) NOT NULL,
    DATA_INICIO timestamp without time zone NOT NULL,
    DATA_FIM timestamp without time zone,
    PRECO numeric(12, 2),
    PRIMARY KEY (ID),
    CONSTRAINT FK_VIAGEM_USUARIO FOREIGN KEY (CODIGO_USUARIO)
        REFERENCES public.USUARIOS (CODIGO) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
        NOT VALID,
    CONSTRAINT FK_VIAGEM_BICICLETA FOREIGN KEY (CODIGO_BICICLETA)
        REFERENCES public.BICICLETAS (CODIGO) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
        NOT VALID
);

ALTER TABLE public.VIAGENS
    OWNER to dia3;

CREATE SEQUENCE public.usuarios_sequence
    start 1
    increment 1;


--TRABALHO DIA5

create table ATIVOS (
    CODIGO          character(6) not null,
    DESCRICAO       character(60) not null,
    primary key (CODIGO)
);

ALTER TABLE public.ativos
    OWNER to dia3;

create table CARTEIRA (
    CODIGO_ATIVO    character(6) not null,
    QUANTIDADE      numeric(10) not null,
    PRECO_MEDIO     numeric(12, 4) not null,
    primary key (CODIGO_ATIVO),
    constraint FK_CARTEIRA_ATIVO foreign key (CODIGO_ATIVO) references ATIVOS(CODIGO)
);

TABLESPACE pg_default;

ALTER TABLE public.carteira
    OWNER to dia3;

create table OPERACOES (
    ID              numeric(10) not null,    /* Utilize a sequencia SEQ_OPERACOES_ID para gerar as chaves desta tabela (auto incremento) */
    CODIGO_ATIVO    character(6) not null,/* O papel (ativo) que foi transacionado */
    TIPO            char(1) not null,       /* Utilize 'V' para venda e 'C' para compra */
    DATA            timestamp default NOW() not null, /* Infome a data da operação */
    PRECO           numeric(12,2) not null, /* Informe o preço por ação da operação */
    QUANTIDADE      numeric(10) not null,   /* Quantidade que foi vendida ou comprada */
    LUCRO_PREJUIZO  numeric(12,2) null,     /* Lucro ou Prejuízo da operação. Só preencher quando for uma operação do tipo VENDA (TIPO = 'V'), caso contrário gravar NULL */
    primary key (ID),
    constraint FK_OPERACAO_ATIVO foreign key (CODIGO_ATIVO) references ATIVOS(CODIGO)
);

ALTER TABLE public.operacoes
    OWNER to dia3;

CREATE SEQUENCE public.seq_operacoes_id
    start 1
    increment 1;
