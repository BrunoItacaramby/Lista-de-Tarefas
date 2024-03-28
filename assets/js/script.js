inputTarefa = document.querySelector('.input-tarefa')
btnTarefa = document.querySelector('.btn-tarefa')
tarefas = document.querySelector('.tarefas')

function criaLi() {
    const li = document.createElement('li')
    return li
}

function limpaInput() {
    inputTarefa.value = ''
    inputTarefa.focus()
}

function criaTarefa(inputTexto) {
    const li = criaLi()
    li.innerText = inputTexto
    tarefas.appendChild(li)
    criaBotaoApagar(li)
    limpaInput()
    salvarTarefas()
}

function criaBotaoApagar(li) {
    const botaoApagar = document.createElement('button')
    botaoApagar.innerText = 'Apagar'
    botaoApagar.setAttribute('class', 'apagar')
    botaoApagar.setAttribute('title', 'apagar essa tarefa')
    li.appendChild(botaoApagar)
}

document.addEventListener('click', function (event) {
    const element = event.target
    if (element.classList.contains('apagar')) {
        element.parentElement.remove()
        salvarTarefas()
    }
})

inputTarefa.addEventListener('keypress', function (event) {
    if (event.keyCode === 13) {
        if (!inputTarefa.value) return3
        criaTarefa(inputTarefa.value)
    }
})

btnTarefa.addEventListener('click', function () {
    if (!inputTarefa.value) return
    criaTarefa(inputTarefa.value)
})

function salvarTarefas() {
    const tarefasLi = tarefas.querySelectorAll('li')
    let listaDeTarefas = []

    for (const tarefa of tarefasLi) {
        let tarefaTexto = tarefa.innerText
        tarefaTexto = tarefaTexto.replace('Apagar', '').trim();
        listaDeTarefas.push(tarefaTexto)
    }
    const tarefasJSON = JSON.stringify(listaDeTarefas)
    localStorage.setItem('tarefas', tarefasJSON)
}

function criaTarefasSalvas() {
    const tarefasSalvas = localStorage.getItem('tarefas')
    const tarefasSalvasJSON = JSON.parse(tarefasSalvas)

    for (const tarefa of tarefasSalvasJSON) {
        criaTarefa(tarefa)
    }
}

criaTarefasSalvas()
