# Estatisticas

Novo painel de Estatísticas para o Painel de desmatamento


#Dependências

- npm
- Yeoman
- bower


#Guia de instalação

##Primeira instalação:
Para instalação do npm sugiro este link: 
```
https://github.com/joyent/node/wiki/installing-node.js-via-package-manager
```

Então instale as dependências:
```
npm install -g yo
npm install -g bower
npm install -g grunt-cli
```

Clonando este respositório: 
```
git clone https://github.com/ibamacsr/estatisticas.git
```

Entre na pasta do sistema e execute:
```
npm install
bower install
```

Para forçar o git a usar o https (Em redes com acesso ao git via http bloqueado):
```
git config --global url."https://".insteadOf git://
```

##Usuários com dependências já instaladas:

Clonando este respositório: 
```
git clone https://github.com/ibamacsr/estatisticas.git
```

Entre na pasta do sistema e execute:
```
npm install
bower install
```

E então, para iniciar o servidor em grunt:

``` 
grunt serve
```


#Tutoriais:

##Utilizando o Yeoman para esta aplicação:

Comandos:
```
yo angular:controller "ControlName"
yo angular:directive "DirectiveName"
yo angular:service "ServiceName"
yo angular:factory "FactoryName"
```

##Utilizando o grunt para construir a aplicação:

Para startar o servidor grunt:
``` 
grunt serve
```
Para construir a aplicação em minify:
```
grunt build
```Pasta da aplicação: dist/```
```

Divirtam-se!


