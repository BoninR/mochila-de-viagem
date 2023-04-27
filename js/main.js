const form = document.getElementById("novoItem")
const lista = document.getElementById('Lista')
const itens = JSON.parse(localStorage.getItem('itens')) || []


itens.forEach( (evento)=>{
    criarElemento(evento)
})

form.addEventListener("submit", (evento) => {
    /. preventDefault faz parar o reload do submit ./
    evento.preventDefault()
    const elemento = (evento.target.elements['nome'])
    const quantidade = (evento.target.elements['quantidade'])

    const existe = itens.find(elemento => elemento.nome === nome.value)

    const itemAtual = {
        'nome': elemento.value,
        'quantidade': quantidade.value
    }

    if(existe){
        itemAtual.id = existe.id
        atualizaElemento(itemAtual)

        itens[itens.findIndex(elemento=>elemento.id === existe.id)] = itemAtual
    }    else{
        itemAtual.id = itens[itens.length -1] ? (itens[itens.length-1]).id + 1: 0;

        criarElemento(itemAtual)

        itens.push(itemAtual)
    }

 
   

    localStorage.setItem('itens', JSON.stringify(itens))
    console.log(itens)
    elemento.value = ''
    quantidade.value = ''

 })

function criarElemento(item){
    // <li class="item"><strong>7</strong>Camisas</li>

    if(nome != null && quantidade != null){
        if(nome != '' && quantidade != ''){
            const novo_item = document.createElement('li')
            novo_item.classList.add('item')
    
            const numeroItem = document.createElement('strong')
            numeroItem.innerHTML = item.quantidade 
            numeroItem.dataset.id = item.id   
            novo_item.appendChild(numeroItem)

            novo_item.innerHTML += item.nome    
            
            novo_item.appendChild(botaodelta(item.id))

            lista.appendChild(novo_item)   

        }
    }
}

function atualizaElemento(item){
    document.querySelector("[data-id='"+item.id+"']").innerHTML = item.quantidade

}

function botaodelta(id){
    const elementobotao = document.createElement("button")
    elementobotao.innerHTML = "X"

    elementobotao.addEventListener("click", function(){
        deletaElemento(this.parentNode, id)
    })

    return elementobotao
}

function deletaElemento(tag, id){
    tag.remove()
    itens.splice(itens.findIndex(elemento => elemento.id === id), 1)
    localStorage.setItem('itens', JSON.stringify(itens))
}

