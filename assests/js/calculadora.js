// Variavel que vai acumular toda expressão em String
let allCalc = ''

// Função - Adiciona a espressão à variavel
function acumularCalc(number) {
    allCalc += number
    document.getElementById('outCalc').textContent += number
}

// Função - Verificação para não coloca mais de uma operação matemática em seguida
function trueOperation(operation) {
    let allOperation = allCalc.split('')
    let endOperation = allOperation[allOperation.length - 1]

    if( /^[0-9]$/.test(endOperation) || endOperation == "("  || endOperation == ")" ) {
        return true
    } else {
        return false
    }
}

// Função - Verificação da expressão matemática e retorna o valor total do resultado
function calculate(expression) {
    try {
        return Function(`return ${expression}`)()
    } catch (error) {
        return 'Erro de expressão'
    }
}

// Evento para colocar números
document.querySelectorAll('.btnNumber').forEach(function(number) {
    number.addEventListener('click', () => {
        let printNumber = number.value
        acumularCalc(printNumber)
    })
})

// Evento para colocar operações
let estadoOperation = 0
document.querySelectorAll('.btnOperations').forEach(function(operation) {
    operation.addEventListener('click', () => {
        let printOperation = operation.value

        if (trueOperation(printOperation)) {
            acumularCalc(printOperation)
        }

    })
})

// Evento para inserir as aspas e verifição das aspas para abrir e fechar
let estadoAspas = 0
document.getElementById('aspas').addEventListener('click', () => {
    if (estadoAspas === 0) {
        document.getElementById('outCalc').textContent += "("
        allCalc += "("
        estadoAspas = 1
    } else {
        document.getElementById('outCalc').textContent += ")"
        allCalc += ")"
        estadoAspas = 0
    }
})

// Evento para Limpar tudo
document.getElementById('del').addEventListener('click', () => {
    allCalc = ''
    estadoAspas = 0
    document.getElementById('outCalc').textContent = ''
})

// Evento para retornar resultado da expressão matemática
document.getElementById('equal').addEventListener('click', () => {
    allCalc = String( calculate(allCalc) ) // Converte em string para imprimir em tela e não dar problema do calculo interno
    document.getElementById('outCalc').textContent = allCalc
})