var music = new Audio('music.mp3');
music.play();

const blinking = setInterval(blink, 20);

const tick = setInterval(refresh, 500);

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function blink(){
    document.getElementById('blink').style.display="block";
    await sleep(50);
    document.getElementById('blink').style.display="none";
}

function refresh(){
    let spans = document.getElementsByClassName('results');

    for (let i=0; i<spans.length; i++){
        
    }
}