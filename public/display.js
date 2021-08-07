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
    list.innerHTML += 'Onekilobit OS - Version 0.5.1<br />(C) Copyright Onekilobit Servers �̵̛̙͇̿͗͘�̷͉̗̐�̸̨͖̣̻͓̣̈́͗͗́ - �̶̨̧̨͔̗̖͎͕̒̍̈́̋̓̚�̴̧̹̻͖̦̭̬͝�̸̝̓̃̏̓̀̄͛̓͘͝. All rights reserved.';

    let list2 = document.createElement('li');
    list2.id = 'loading';
    response = 'Starting operating system';
    list2.innerHTML = response;
    ul.appendChild(list2);

    for (let i = 0; i < 6; i++) {
        list2.innerHTML += '.';
        await sleep(500);
    }

    signal.play();

    ul.remove();
    document.getElementById('command_line').remove();

    document.getElementById('GUI').style.display = 'flex';
    document.getElementById('accessLVL').style.display = 'block';
    document.getElementById('taskbar').style.display = 'flex';
    document.getElementById('ostime').style.display = 'block';

    let icons = document.getElementsByClassName('icon');
    for (let i = 0; i < icons.length; i++) {
        icons[i].style.display = "inline";
    }

    //terminal.classList.remove('hide');
}

// executed after startup.mp3 ended
function afterstart() {
    fan.play();
}

// clock
var ostime = document.getElementById('ostime');
const tick = setInterval(refreshTime, 1000);
function refreshTime() { ostime.innerText = moment().format("YYYY/MM/DD") + ' ' + moment().format("hh:mm:ss"); }


// messenger
function showMessenger() {
    enter.play();
    document.getElementById('messengerWindow').style.display = 'block';
}
function closeMessenger() {
    enter.play();
    document.getElementById('messengerWindow').style.display = 'none';
}

// login
function login() {  
    if (joined)
        showMessenger();
    else
        showLogin();
}
function showLogin() {
    document.getElementById('login').style.display = 'block';
}
function closeLogin() {
    document.getElementById('login').style.display = 'none';
}
function retryLogin() {
    let h3 = document.getElementById('login').getElementsByTagName('h3')[0];
    h3.style.color = 'red'
    h3.innerHTML = 'Please retry <button id="closeLogin" onclick="closeLogin()">X</button></h3>';
}


function displayMessage(data) {
    let authorClass = ""; // who sent it? me or you?
    let divClass = ""

    // me or you?
    if (data.id === ID) {
        authorClass = "me";
        divClass = "myDiv";
        enter.play();
    } else {
        authorClass = "you";
        divClass = "yourDiv";
        arrows.play();
    }

    // actual display
    const div = document.createElement("div");
    div.className = divClass;
    const li = document.createElement("li");

    const p = document.createElement("p");
    p.className = "time";
    p.innerText = moment().format("hh:mm");

    if (data.id === ID)
        div.innerHTML = '<span class="' + authorClass + '">' + data.data.value + "</span>";
    else
        div.innerHTML = '<span class="' + authorClass + '"><span class="r">' + data.data.user + '</span>></span><span class="message"> ' + data.data.value + "</span>";

    div.appendChild(p);
    li.appendChild(div);

    document.getElementById("messages").appendChild(li);

    let messengerWindow = document.getElementById('messages');
    messengerWindow.scrollTo(0, messengerWindow.scrollHeight);
}

// sleeeep
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}