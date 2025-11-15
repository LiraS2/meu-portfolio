var lamp = document.getElementById('lamp');

lamp.src = 'assets/lamp_off.png';
lamp.alt = 'lampada acendida';



lamp.addEventListener('click', function (){
    if (lamp.src.includes('assets/lamp_off.png')) {
        lamp.src = 'assets/lamp_on.png'
        lamp.alt = 'lampada acendida'
        document.body.style.background = 'radial-gradient(circle, yellow 8%, black 100%)';
    } else {
        lamp.src = 'assets/lamp_off.png'
        lamp.alt = 'lampada apagada'
        document.body.style.background = 'radial-gradient(circle, white 8%, black 100%)';
    }
});
