//criando grafo e adicionando os respectivos pesos para cada cidade criada  
let possibilidades = {
    'Oradea': {'Zerind': 71, 'Sibiu': 151},
    'Zerind': {'Arad': 75, 'Oradea': 71},
    'Arad': {'Zerind': 75, 'Sibiu': 140, 'Timisoara': 118},
    'Timisoara': {'Arad': 118, 'Lugoj': 111},
    'Lugoj': {'Timisoara': 111, 'Mehadia': 70},
    'Mehadia': {'Lugoj': 70, 'Dobreta': 75},
    'Dobreta': {'Mehadia': 75, 'Craiova': 120},
    'Craiova': {'Dobreta': 120, 'Rimnicu Vilcea': 146, 'Pitesti': 138},
    'Sibiu': {'Oradea': 151, 'Arad': 140, 'Fagaras': 99, 'Rimnicu Vilcea': 80},
    'Rimnicu Vilcea': {'Sibiu': 80, 'Craiova': 146, 'Pitesti': 97},
    'Fagaras': {'Sibiu': 99, 'Bucharest': 211},
    'Pitesti': {'Rimnicu Vilcea': 97, 'Craiova': 138, 'Bucharest': 101},
    'Bucharest': {'Fagaras': 211, 'Pitesti': 101, 'Giurgiu': 90, 'Urziceni': 85},
    'Giurgiu': {'Bucharest': 90},
    'Urziceni': {'Bucharest': 85, 'Hirsova': 98, 'Vaslui': 142},
    'Hirsova': {'Urziceni': 98, 'Eforie': 86},
    'Eforie': {'Hirsova': 86},
    'Vaslui': {'Urziceni': 142, 'Iasi': 92},
    'Iasi': {'Vaslui': 92, 'Neamt': 87},
    'Neamt': {'Iasi': 87}
};

function buscarCaminho(origem, meta, possibilidades) {
    let visitado = []; //cria vazio, preenchendo depois...
    let peso = {[origem]: 0}; //custo do trajeto partindo da origem p/ destino.
    let caminho = {[origem]: [origem]}; //inicialmente na origem.
    let aresta = [origem]; //inicialmente na origem, vai armazenar nó's a serem vizitados.
    
    //enquanto lista(aresta) != vazio.
    while (aresta.length) {
        //retira elemento 0 
        let no = aresta.shift();
        
        //caso nó == meta => retorna o próprio nó.
        if (no === meta) {
            return [caminho[no], peso[no]];
        }

        //se nó não foi visitado, ele é add na lista(visitado).
        if (!visitado.includes(no)) {
            visitado.push(no);
            
            //atualiza melhor caminho(peso) p/ cada vizinho do nó(atual).
            for (let vizinho in possibilidades[no]){
                let nPeso = peso[no] + possibilidades[no][vizinho];

                //vizinho foi visitado? ou o novo peso é menor que o anterior?
                if (!(vizinho in peso) || nPeso < peso[vizinho]) {
                    peso[vizinho] = nPeso;
                    //vai concatenando o caminho.
                    caminho[vizinho] = caminho[no].concat(vizinho);
                    
                    //add vizinho atual a lista de nó's p/ visitar(aresta), caso não esteja lá.
                    if (!aresta.includes(vizinho)) {
                        aresta.push(vizinho);
                    }

                    //ordena lista de nó's a serem visitados com base no peso,
                    //do caminho de cada um deles.
                    aresta.sort((a, b) => peso[a] - peso[b]);
                }
            }
        }
    }
    return null;
}

let origem = 'Sibiu'; //ponto de partida
let objetivo = 'Arad'; //ponto de chegada

let caminho = buscarCaminho(origem, objetivo, possibilidades);
console.log(`\nO caminho mais rápido entre ${origem} e ${objetivo} é: \n\n> ${caminho[0].join(' --> ')}.`);
//conferindo o custo final pelo caminho
console.log(`\nO custo pelo trajeto é de ${caminho[1]}\n`);
