//capturar evento de submit do formulario ( parar o envio)

/*const form = document.querySelector('#formulario')

form.addEventListener('submit', function(evento){
    evento.preventDefault();

    const inputPeso = evento.target.querySelector('#peso')// pega o elemento do form
    const inputAltura = evento.target.querySelector('#altura')

    const peso = Number(inputPeso.value);
    const altura = Number(inputAltura.value);

    if(!peso){
        setResultado('Peso invalido', false);
        return;
    }
    if(!altura){
        setResultado('Altura invalido', false);
        return;
    }


});

function criaP(){
    const paragrafo = document.createElement('paragrafo');
    return paragrafo;
}

function setResultado(res,isValid){
    const resultado = document.querySelector('#res-calculo')
    resultado.innerHTML = '';
    paragrafo.innerHTML ='IMC a cima'

    const p = criaP();
    p.innerHTML = res;
    resultado.appendChild(p)


};*/

// Capturar evento de submit do formulário (parar o envio)
// Capturar evento de submit do formulário (parar o envio)
const form = document.querySelector('#formulario');

form.addEventListener('submit', function(evento) {
    evento.preventDefault();

    const inputPeso = evento.target.querySelector('#peso'); // Pega o elemento do form
    const inputAltura = evento.target.querySelector('#altura');

    const peso = Number(inputPeso.value);
    const altura = Number(inputAltura.value);

    if (!peso || peso <= 0) {
        setResultado('Peso inválido', 'Erro');
        return;
    }
    if (!altura || altura <= 0) {
        setResultado('Altura inválida', 'Erro');
        return;
    }

    const imc = calcularIMC(peso, altura);
    const nivelIMC = getNivelIMC(imc);

    const msg = `Seu IMC é ${imc} (${nivelIMC}).`;
    setResultado(msg, nivelIMC);
});

function calcularIMC(peso, altura) {
    return (peso / (altura * altura)).toFixed(2);
}

function getNivelIMC(imc) {
    const nivel = ['Abaixo do peso', 'Peso normal', 'Sobrepeso', 'Obesidade grau 1', 'Obesidade grau 2', 'Obesidade grau 3'];

    if (imc < 18.5) return nivel[0];
    if (imc < 25) return nivel[1];
    if (imc < 30) return nivel[2];
    if (imc < 35) return nivel[3];
    if (imc < 40) return nivel[4];
    return nivel[5];
}

function criaP() {
    const paragrafo = document.createElement('p');
    return paragrafo;
}

function setResultado(res, nivelIMC) {
    const resultado = document.querySelector('#res-calculo');
    resultado.innerHTML = '';

    const p = criaP();
    p.innerHTML = res;

    // Adiciona classes CSS com base no nível do IMC
    switch (nivelIMC) {
        case 'Abaixo do peso':
            p.classList.add('abaixo-peso');
            break;
        case 'Peso normal':
            p.classList.add('peso-normal');
            break;
        case 'Sobrepeso':
            p.classList.add('sobrepeso');
            break;
        case 'Obesidade grau 1':
        case 'Obesidade grau 2':
        case 'Obesidade grau 3':
            p.classList.add('obesidade');
            break;
        default:
            p.classList.add('bad'); // Para erros ou valores inválidos
    }

    resultado.appendChild(p);
}