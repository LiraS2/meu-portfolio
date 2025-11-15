// Declaração de variáveis

var result = document.getElementById("result");
//chamando botoes de agente
var car_red = document.getElementById("red");
var car_white = document.getElementById("white");
var btn_circle_red = document.getElementById("vermelho");
var btn_circle_white = document.getElementById("branco");

// carro selecionado
var carroSelecionado = null;

// POSIÇÃO ATUAL (que muda)
var v_top, v_left, v_right, v_height, v_width;

// POSIÇÃO ORIGINAL (para o reset)
var v_top_orig, v_left_orig, v_right_orig, v_height_orig, v_width_orig;


//chamando botoes de acao
var btns_ctrl = document.getElementsByClassName("btn");

//chamando botoes de agente
car_red.addEventListener("click", sel_car_red);
car_white.addEventListener("click", sel_car_white);
btn_circle_red.addEventListener("click", sel_car_red);
btn_circle_white.addEventListener("click", sel_car_white);

//chamando botoes de acao
btns_ctrl[0].addEventListener("click", reset)
btns_ctrl[1].addEventListener("click", acel)
btns_ctrl[2].addEventListener("click", desacel)

// Declarar funções


//Função ao selecionar carro vermelho
function sel_car_red(){
    document.body.style.backgroundColor = "red";
    document.body.style.color = "black";
    result.textContent = "Vermelho";
    btns_ctrl_block_fun();

    carroSelecionado = car_red;
    salvarPosicaoInicial();
}

//Função ao selecionar carro branco
function sel_car_white(){
    document.body.style.backgroundColor = "white";
    document.body.style.color = "black";
    result.textContent = "Branco";
    btns_ctrl_block_fun();

    carroSelecionado = car_white;
    salvarPosicaoInicial();
}

function salvarPosicaoInicial(){
    if(!carroSelecionado) return; 

    v_top = parseInt(window.getComputedStyle(carroSelecionado).top);
    v_left = parseInt(window.getComputedStyle(carroSelecionado).left);
    v_right = parseInt(window.getComputedStyle(carroSelecionado).right);
    v_height = parseInt(window.getComputedStyle(carroSelecionado).height);
    v_width = parseInt(window.getComputedStyle(carroSelecionado).width);

    v_top_orig = v_top;
    v_left_orig = v_left;
    v_right_orig = v_right;
    v_height_orig = v_height;
    v_width_orig = v_width;
}


//botões de controle - mostrar
function btns_ctrl_block_fun(){
    for(i=0; i<= 2; i++){
        btns_ctrl[i].style.display = "block";
    }
}

//botões de controle - ocultar
function btns_ctrl_none_fun(){
    for(i=0; i<= 2; i++){
        btns_ctrl[i].style.display = "none";
    }
}

//quando resetar
function reset(){
    document.body.style.backgroundColor = "black";
    document.body.style.color = "white";
    result.textContent = "?";

    if (carroSelecionado) {
        v_top = v_top_orig;
        v_left = v_left_orig;
        v_right = v_right_orig;
        v_height = v_height_orig;
        v_width = v_width_orig;

        carroSelecionado.style.top = v_top + "px";
        carroSelecionado.style.left = v_left + "px";
        carroSelecionado.style.right = v_right + "px";
        carroSelecionado.style.height = v_height + "px";
        carroSelecionado.style.width = v_width + "px";
        carroSelecionado = null
    }

    btns_ctrl_none_fun();
}


function acel(){
    if (carroSelecionado) {

        var limite_tamanho = 10;
        var limite_top = 22; 
        var limite_lateral = 245; 

        var next_top = v_top - 1;
        var next_height = v_height - 1;
        var next_width = v_width - 1;

        if (next_top <= limite_top) { next_top = limite_top; }
        if (next_height <= limite_tamanho) { next_height = limite_tamanho; }
        if (next_width <= limite_tamanho) { next_width = limite_tamanho; }

        v_top = next_top;
        v_height = next_height;
        v_width = next_width;

        carroSelecionado.style.top = v_top + "px";
        carroSelecionado.style.height = v_height + "px";
        carroSelecionado.style.width = v_width + "px";

        if (carroSelecionado === car_red) {
            var next_right = v_right + 1;
            if (next_right >= limite_lateral) { next_right = limite_lateral; } 
            v_right = next_right;
            carroSelecionado.style.right = v_right + "px";
        } else if (carroSelecionado === car_white) {
            var next_left = v_left + 1;
            if (next_left >= limite_lateral) { next_left = limite_lateral; }
           v_left = next_left;
            carroSelecionado.style.left = v_left + "px";
        } 
    } else {
        alert("Selecione primeiro um dos carros.");
    }
}


function desacel(){
    if (carroSelecionado) {

        var next_top = v_top + 1;
        var next_height = v_height + 1;
        var next_width = v_width + 1;

        if (next_top >= v_top_orig) { next_top = v_top_orig; }
        if (next_height >= v_height_orig) { next_height = v_height_orig; }
        if (next_width >= v_width_orig) { next_width = v_width_orig; }

        v_top = next_top;
        v_height = next_height;
        v_width = next_width;

        carroSelecionado.style.top = v_top + "px";
       carroSelecionado.style.height = v_height + "px";
        carroSelecionado.style.width = v_width + "px";

        if (carroSelecionado === car_red) {
            var next_right = v_right - 1;
            if (next_right <= v_right_orig) { next_right = v_right_orig; }
            v_right = next_right;
            carroSelecionado.style.right = v_right + "px";
        } else if (carroSelecionado === car_white) {
            var next_left = v_left - 1;
            if (next_left <= v_left_orig) { next_left = v_left_orig; }
           v_left = next_left;
            carroSelecionado.style.left = v_left + "px";
        }
    } else {
        alert("Selecione primeiro um dos carros.");
    }
}


document.addEventListener("keydown", function(event){
    var tecla = event.key;
    console.log(tecla);
     if(tecla == "ArrowUp"){
        acel()
    }
    if(tecla == "ArrowDown"){
        desacel()
    }
})