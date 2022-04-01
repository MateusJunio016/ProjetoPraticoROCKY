// // Inicialização de arquivo de sistema
const fs = require('fs');

// // Realizando a localização do banco de dados através do método require
var jsonBanco = require('./broken-database.json');

//Chamando todas as funções de correção
for(i = 0; i < jsonBanco.length; i++){
    corrigirLetras(i);
}
corrigirQuantidade(jsonBanco);
corrigirPrecos(jsonBanco);
corrigirOrdem(jsonBanco);

//Exportando o banco de dados corrigido
exportarJson(JSON.stringify(jsonBanco));

//Chamando função de soma por categoria
console.log(somarItens(jsonBanco));

//Exibindo função de soma por categoria
console.log(JSON.stringify(somarItens(jsonBanco)));

//Iniciando funções de reparação de dados

// Função para modificar letras/caracteres corrompidos
function corrigirLetras(i) {
    jsonBanco[i].name = jsonBanco[i].name.replaceAll('æ', 'a');
    jsonBanco[i].name = jsonBanco[i].name.replaceAll('¢', 'c');
    jsonBanco[i].name = jsonBanco[i].name.replaceAll('ø', 'o');
    jsonBanco[i].name = jsonBanco[i].name.replaceAll('ß', 'b');
    return(jsonBanco[i].name)
}

//Função que corrige os números que possuem valor string, para number
function corrigirPrecos(i) {

    for(var element in i) {
        var priceErr = i[element].price
        priceErr = parseFloat(priceErr)

        i[element].price = priceErr 
    }
    return i;
   
}

// Função para corrigir a quantidade 0 apagada
function corrigirQuantidade(i){

        return i.map((pos) =>{
            if (pos.quantity == undefined){
                pos.quantity = 0;
            }
            else {
                return pos;
            }
        })
}

// Iniciando função de ordenação por categoria ou id
//obs: A fução abaixo faz referência ao seguinte link: https://gomakethings.com/sorting-an-array-by-multiple-criteria-with-vanilla-javascript/
function corrigirOrdem(i)
{
    i.sort(function ( a, b){
        if(a.category < b.category) {
            return -1;
        }
        else 
        {
            if ((a.category == b.category) && (a.id < b.id))
            {
                return -1;
            }
            return true;
        }
    });
    console.log(i);
    return i;
}


//Função para somar a quantidade dos itens, de acordo com a categoria
function somarItens(i) {
    var itens = [];
    var itera = -1;
    var antCategory = '';
    for(a in i) {
        if(antCategory != i[a].category) {
            itens.push({
                'category': i[a].category,
                'quantity': 0
            })
            itera++;
        }

        itens[itera].quantity += i[a].quantity;
        antCategory = i[a].category;
    }

    return itens;
}

//Função para exportar o banco de dados
//obs: A função abaixo faz referências ao seguinte link: https://www.mundojs.com.br/2020/03/06/utilizando-o-file-system-para-atualizar-deletar-e-renomear-arquivos/
function exportarJson(i)
{
    fs.appendFile('saida.json', i, 'utf8', function (err) {
        if (err) throw err;
        console.log('Arquivo Salvo!');
      });
}

