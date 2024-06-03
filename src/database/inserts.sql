-- Inserts para a tabela categoria
INSERT INTO categoria (nome_categoria, descricao_categoria) VALUES
    ('Eletrônicos', 'Eletrônicos em geral'),
    ('Roupas', 'Roupas masculinas e femininas'),
    ('Calçados', 'Calçados de diversos tipos'),
    ('Móveis', 'Móveis para casa e escritório'),
    ('Alimentos', 'Alimentos variados'),
    ('Cosméticos', 'Produtos de beleza e higiene'),
    ('Livros', 'Livros de diferentes gêneros'),
    ('Acessórios', 'Acessórios diversos'),
    ('Brinquedos', 'Brinquedos para crianças'),
    ('Ferramentas', 'Ferramentas para uso geral'),
    ('Artigos Esportivos', 'Artigos para prática de esportes'),
    ('Jogos', 'Jogos de videogame'),
    ('Musicais', 'Instrumentos musicais variados'),
    ('Decoração', 'Itens de decoração para casa'),
    ('Papelaria', 'Artigos de papelaria');

-- Inserts para a tabela endereco
INSERT INTO endereco (cep, rua, bairro, cidade, numero, complemento, uf) VALUES
    ('12345-678', 'Rua Um', 'Bairro Um', 'Cidade Um', '123', 'Complemento Um', 'UF'),
    ('23456-789', 'Rua Dois', 'Bairro Dois', 'Cidade Dois', '234', 'Complemento Dois', 'UF'),
    ('34567-890', 'Rua Três', 'Bairro Três', 'Cidade Três', '345', 'Complemento Três', 'UF'),
    ('45678-901', 'Rua Quatro', 'Bairro Quatro', 'Cidade Quatro', '456', 'Complemento Quatro', 'UF'),
    ('56789-012', 'Rua Cinco', 'Bairro Cinco', 'Cidade Cinco', '567', 'Complemento Cinco', 'UF'),
    ('67890-123', 'Rua Seis', 'Bairro Seis', 'Cidade Seis', '678', 'Complemento Seis', 'UF'),
    ('78901-234', 'Rua Sete', 'Bairro Sete', 'Cidade Sete', '789', 'Complemento Sete', 'UF'),
    ('89012-345', 'Rua Oito', 'Bairro Oito', 'Cidade Oito', '890', 'Complemento Oito', 'UF'),
    ('90123-456', 'Rua Nove', 'Bairro Nove', 'Cidade Nove', '901', 'Complemento Nove', 'UF'),
    ('01234-567', 'Rua Dez', 'Bairro Dez', 'Cidade Dez', '012', 'Complemento Dez', 'UF'),
    ('12345-678', 'Rua Onze', 'Bairro Onze', 'Cidade Onze', '123', 'Complemento Onze', 'UF'),
    ('23456-789', 'Rua Doze', 'Bairro Doze', 'Cidade Doze', '234', 'Complemento Doze', 'UF'),
    ('34567-890', 'Rua Treze', 'Bairro Treze', 'Cidade Treze', '345', 'Complemento Treze', 'UF'),
    ('45678-901', 'Rua Quatorze', 'Bairro Quatorze', 'Cidade Quatorze', '456', 'Complemento Quatorze', 'UF'),
    ('56789-012', 'Rua Quinze', 'Bairro Quinze', 'Cidade Quinze', '567', 'Complemento Quinze', 'UF');



-- Inserts para a tabela cliente
INSERT INTO cliente (email, username, senha, nome, cpf, telefone, data_nascimento, endereco_id) VALUES
    ('cliente1@example.com' , 'cliente1', 'senha123', 'Cliente 1', '12345678901', '11987654321', '1990-01-01', 1),
    ('cliente2@example.com' , 'cliente2', 'senha123', 'Cliente 2', '23456789012', '11976543210', '1991-02-02', 2),
    ('cliente3@example.com' , 'cliente3', 'senha123', 'Cliente 3', '34567890123', '11965432109', '1992-03-03', 3),
    ('cliente4@example.com' , 'cliente4', 'senha123', 'Cliente 4', '45678901234', '11954321098', '1993-04-04', 4),
    ('cliente5@example.com' , 'cliente5', 'senha123', 'Cliente 5', '56789012345', '11943210987', '1994-05-05', 5),
    ('cliente6@example.com' , 'cliente6', 'senha123', 'Cliente 6', '67890123456', '11932109876', '1995-06-06', 6),
    ('cliente7@example.com' , 'cliente7', 'senha123', 'Cliente 7', '78901234567', '11921098765', '1996-07-07', 7),
    ('cliente8@example.com' , 'cliente8', 'senha123', 'Cliente 8', '89012345678', '11910987654', '1997-08-08', 8),
    ('cliente9@example.com' , 'cliente9', 'senha123', 'Cliente 9', '90123456789', '11909876543', '1998-09-09', 9),
    ('cliente10@example.com', 'cliente10', 'senha123', 'Cliente 10', '11234567890', '11998765432', '1999-10-10', 10),
    ('cliente11@example.com', 'cliente11', 'senha123', 'Cliente 11', '22345678901', '11987654321', '2000-11-11', 11),
    ('cliente12@example.com', 'cliente12', 'senha123', 'Cliente 12', '33456789012', '11976543210', '2001-12-12', 12),
    ('cliente13@example.com', 'cliente13', 'senha123', 'Cliente 13', '44567890123', '11965432109', '2002-01-01', 13),
    ('cliente14@example.com', 'cliente14', 'senha123', 'Cliente 14', '55678901234', '11954321098', '2003-02-02', 14),
    ('cliente15@example.com', 'cliente15', 'senha123', 'Cliente 15', '66789012345', '11943210987', '2004-03-03', 15);

-- Inserts para a tabela pedido
INSERT INTO pedido (numero_pedido, valor_total_pedido, data_pedido, status, cliente_id) VALUES
    (1, 100.00, '2024-01-01', true, 1),
    (2, 150.00, '2024-01-02', true, 2),
    (3, 200.00, '2024-01-03', false, 3),
    (4, 250.00, '2024-01-04', false, 4),
    (5, 300.00, '2024-01-05', true, 5),
    (6, 350.00, '2024-01-06', true, 6),
    (7, 400.00, '2024-01-07', false, 7),
    (8, 450.00, '2024-01-08', true, 8),
    (9, 500.00, '2024-01-09', true, 9),
    (10, 550.00, '2024-01-10', false, 10),
    (11, 600.00, '2024-01-11', true, 11),
    (12, 650.00, '2024-01-12', false, 12),
    (13, 700.00, '2024-01-13', true, 13),
    (14, 750.00, '2024-01-14', true, 14),
    (15, 800.00, '2024-01-15', false, 15);

-- Inserts para a tabela produto
INSERT INTO produto (nome_produto, descricao_produto, preco_produto, qtd_estoque, categoria_id, imagem) VALUES
    ('Produto 1', 'Descrição do Produto 1', 10.00, 100, 1, 'imagem1.jpg'),
    ('Produto 2', 'Descrição do Produto 2', 20.00, 200, 2, 'imagem2.jpg'),
    ('Produto 3', 'Descrição do Produto 3', 30.00, 300, 3, 'imagem3.jpg'),
    ('Produto 4', 'Descrição do Produto 4', 40.00, 400, 4, 'imagem4.jpg'),
    ('Produto 5', 'Descrição do Produto 5', 50.00, 500, 5, 'imagem5.jpg'),
    ('Produto 6', 'Descrição do Produto 6', 60.00, 600, 6, 'imagem6.jpg'),
    ('Produto 7', 'Descrição do Produto 7', 70.00, 700, 7, 'imagem7.jpg'),
    ('Produto 8', 'Descrição do Produto 8', 80.00, 800, 8, 'imagem8.jpg'),
    ('Produto 9', 'Descrição do Produto 9', 90.00, 900, 9, 'imagem9.jpg'),
    ('Produto 10', 'Descrição do Produto 10', 100.00, 1000, 10, 'imagem10.jpg'),
    ('Produto 11', 'Descrição do Produto 11', 110.00, 1100, 11, 'imagem11.jpg'),
    ('Produto 12', 'Descrição do Produto 12', 120.00, 1200, 12, 'imagem12.jpg'),
    ('Produto 13', 'Descrição do Produto 13', 130.00, 1300, 13, 'imagem13.jpg'),
    ('Produto 14', 'Descrição do Produto 14', 140.00, 1400, 14, 'imagem14.jpg'),
    ('Produto 15', 'Descrição do Produto 15', 150.00, 1500, 15, 'imagem15.jpg');

-- Inserts para a tabela produto_pedido
INSERT INTO produto_pedido (qtd_produto_pedido, preco_produto_pedido, produto_id, pedido_id) VALUES
    (1, 10.00, 1, 1),
    (2, 20.00, 2, 2),
    (3, 30.00, 3, 3),
    (4, 40.00, 4, 4),
    (5, 50.00, 5, 5),
    (6, 60.00, 6, 6),
    (7, 70.00, 7, 7),
    (8, 80.00, 8, 8),
    (9, 90.00, 9, 9),
    (10, 100.00, 10, 10),
    (11, 110.00, 11, 11),
    (12, 120.00, 12, 12),
    (13, 130.00, 13, 13),
    (14, 140.00, 14, 14),
    (15, 150.00, 15, 15);
