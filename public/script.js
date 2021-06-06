async function start() {
    startup.play();
    document.getElementsByTagName('pre')[0].className = "glitch";
    await sleep(100);

    let startScreen = document.getElementsByClassName('startScreen')[0];
    startScreen.style.display = "none";

    let terminal = document.getElementsByClassName('terminal')[0];
    terminal.style.display = "block";

    let ul = document.getElementById('ul');

    await sleep(2000)
    beep.play();
    await sleep(70);

    let list = document.createElement('li');
    ul.appendChild(list);
    list.innerHTML = 'Setting boot up conditions... [OK]<br/>';
    await sleep(500);
    list.innerHTML += 'Scanning filesystems...  [OK]<br/>';
    await sleep(500);
    list.innerHTML += 'Connecting to server...  <span class="r">[ERROR]</span><br/>Authentication required.<br/><br/>';
    await sleep(300);
    list.innerHTML += 'Onekilobit OS - Version 0.0.1<br />(C) Copyright Onekilobit Servers �̵̛̙͇̿͗͘�̷͉̗̐�̸̨͖̣̻͓̣̈́͗͗́ - �̶̨̧̨͔̗̖͎͕̒̍̈́̋̓̚�̴̧̹̻͖̦̭̬͝�̸̝̓̃̏̓̀̄͛̓͘͝. All rights reserved.';

    let list2 = document.createElement('li');
    response = 'Starting operating system...';
    list2.innerHTML = response;
    ul.appendChild(list2);


    /*await sleep(2000);*/

    ul.remove();
    document.getElementById('command_line').remove();

    document.getElementById('GUI').style.display = 'flex';
    document.getElementById('taskbar').style.display = 'flex';

    let icons = document.getElementsByClassName('icon');
    for (let i = 0; i < icons.length; i++){ 
        icons[i].style.display = "inline";
    }    
}

function afterstart() {
    fan.play();
}


function showMessenger(){
    document.getElementById('messengerWindow').style.display = 'block';
}


function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}