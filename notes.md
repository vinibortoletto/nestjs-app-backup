1. O campo "documento" seria um documento real atrelado ao usuário (CPF, RG)?
2. O campo "deletedAt" seria a data em que um novo CSV foi enviado?
3. Os campos deve ser mantidos em português (documento, saldo, data) ou inglês (document, balance, date)?
4. Poderia compartilhar um CSV como exemplo para fins de testes?

Tabela "cliente"
id
email
senha
documento

Tabela "saldo"
id
cliente_documento
saldo
data

1. Login
2. Cadastro
3. Recuperação de senha
4. Upload de CSV

<!-- Descrição -->

1. Autenticação com e-mail e senha (senha criptografada)
2. Recuperação de senha
3. Uma tela que permita o upload de um CSV contendo documento e saldo para usuários, salvando os dados em uma tabela com documento, saldo e data.
   a. Observe que o CSV pode ter mais de uma linha por usuário, e a aplicação deve somar os saldos.
   b. Se o usuário enviar um novo CSV no MESMO DIA, a aplicação deve excluir logicamente os saldos anteriores (usando um campo deletedAt) e criar novos registros
