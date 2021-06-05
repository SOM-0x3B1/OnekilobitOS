var input = document.getElementById('command');
var stage = 0;
var specialInput = 'none';
const history = [];
var hisCount = 0;

input.addEventListener("keydown", async function (event) {
    if (event.keyCode === 13) {
        event.preventDefault();

        enter.pause();
        enter.currentTime = 0;
        enter.play();

        hisCount = 0;

        let cmd = document.getElementById('command').value;
        document.getElementById('command').value = '';
        let response = '';
        cmd = cmd.toLowerCase()

        if (specialInput == 'none') {
            if (stage == 0) {

            } else if (stage == 1) {
                if (cmd == 'alma') {
                    response = 'Hello world!';
                } else if (cmd == 'help') {
                    response = '<span class="r">Warning!</span> Your terminal has restricted command access. Server authentication required.<br/>Available commands:<br />- cd<br />- connect<br />- help<br />- ls'
                } else if (cmd == 'connect') {
                    response = 'Please enter password:'
                    specialInput = 'connectPasswd';
                } else if (cmd == 'reload') {
                    beep.play();
                    response = 'Access denied! <br /> Reloading the terminal will cause permanent damage to the system. Avoid it at any cost!'
                } else if (cmd == 'red') {
                    response = '�̵̛̙͇̿͗͘�̷͉̗̐ە̴̵̨̨̢̜͓͙̠̅̎ͣ͐̽̎͋̃̆̚ͅ�̸̨͖̣̻͓̣̈́͗͗́�̶̨̧̨͔̗̖͎͕̒̍̈́̋̓̚�̴̧̹̻͖̦̭̬͝�̸̝̓̃̏̓̀̄͛̓͘͝ꚽ̶̬͔͑͒͒̿̏̐̐̉͠�̵̤͉̼̬̫̬̱̝̃̊̏̃�̶̭͙͙̝̞͉͈͍̇͆ͅޢ̸̧͉̘̣̱͉̖̪̪̇̽̇͗̈́̉̈̎ɂ̷̡̮͉̯̯̀͛I̵͍̩͓̪͎̪͒̑̑͑̔̍̓͊_̵̡̢̗͖̦̠̣̌͑̈́̎͝ꆱ̶̙̳̪̟̀̏̅̓̓̅͠м̶̨̨̢̢̬͚͚̂̋[̴͇͍̇͆̈́͗̿̓̈͘͜객̴̯͎̱̻̫̥͒̾̄̎͒͝삏̵̛̤̘̈́̈́̆̽̐͝Δ̷̱̺́͂͐̎̎̸̧̻̯̮̰̪͍̩͒͠ˣ̴͇̱̋̄́6̵̨̛̩͔̙̞̝̒́̾̚͜�̵̨̖̻̙̙̦̤͍̆̐̈́̚͝͝�̵̝͒̓̉̾̎͂͘�̸̛͇̝̗̬̈̉̓�̶̫͈̯͚̰̎̌̈́̂͐̇睾̴͇͔͖̀̀͆́͜ͅG̶̢̪̖̏̎͐�̷̫͉̰͔̳̥̥͉̫͌̀̽̾̅̑͆̂́͜�̷͖̙͍͍̞̮̻̿̾͆͂̚̕̚脜̵̢̢͎͉͋̽͒̂̕͘럀̷̦̭͍͔͕͇͉̗̖͑̋̓̉̾̍͜靌̵̫͈͉̟͕͖̭͕̉͆͂̑͜ị̴̢͈̭̙͖̝̜̩̽̒͊͒̒͊̓̉͝�̶̬͖̯̟͎̜̱̲̄͜�̴̧̲̺͍̼͔͍͖̺̠̇ݮ̶̨̧͔̖̥͙͇̳̮͕̈́́̽�̵̡̧̛͈̯͍͓̼̟̒̍̐͊̎̂̂͌̚�̴̢̥͇̂̈̋̓͂͗̑̏̀̌͜'.shuffle();
                    document.getElementsByClassName("terminal")[0].style.borderColor = "red";
                    document.getElementById('command_line').style.borderColor = "red";
                    document.getElementsByTagName('body')[0].style.color = "red";
                    document.getElementById('command').style.color = "red";

                    let nodes = document.querySelectorAll("*");
                    for (let i = 0; i < nodes.length; i++) {
                        nodes[i].style.cursor = 'url("customRed.png"), default';
                    }

                } else if (cmd == 'green') {
                    document.getElementsByClassName("terminal")[0].style.borderColor = "green";
                    document.getElementById('command_line').style.borderColor = "green";
                    document.getElementsByTagName('body')[0].style.color = "green";
                    document.getElementById('command').style.color = "green";

                    horrorMusic.pause();
                    calmMusic.play();
                } else {
                    response = 'Command not found';
                }

                let list = document.createElement('li');
                if (response == 'Access denied! <br /> Reloading the terminal will cause permanent damage to the system. Avoid it at any cost!') {
                    list.className = "r";
                }
                list.innerHTML = '> ' + cmd + "<br />" + response;
                document.getElementById('ul').appendChild(list);

                document.getElementById('ul').scrollTop = list.offsetHeight + list.offsetTop;

                if (cmd == 'green') {
                    let lists = document.getElementsByTagName('li');
                    for (let i = lists.length - 1; i > -1; i--) {
                        lists[i].remove();
                    }

                    beep.play();
                    await sleep(70);

                    let list = document.createElement('li');
                    list.innerHTML = 'D.N.R. Terminal - Version 1.1<br />(C) Copyright D.N.R. Corp. �̵̛̙͇̿͗͘�̷͉̗̐�̸̨͖̣̻͓̣̈́͗͗́ - �̶̨̧̨͔̗̖͎͕̒̍̈́̋̓̚�̴̧̹̻͖̦̭̬͝�̸̝̓̃̏̓̀̄͛̓͘͝. All rights reserved.';
                    document.getElementById('ul').appendChild(list);

                    await sleep(100);

                    let list2 = document.createElement('li');
                    response = 'Type any command and press Enter.<br />Type "help" to see the list of available commands.<br /><br />';
                    list2.innerHTML = response;
                    document.getElementById('ul').appendChild(list2);

                    let nodes = document.querySelectorAll("*");
                    for (let i = 0; i < nodes.length; i++) {
                        nodes[i].style.cursor = 'url("custom.png"), default';
                    }
                } else if (cmd == 'red') {
                    let nodes = document.querySelectorAll("*");
                    for (let i = 0; i < nodes.length; i++) {
                        nodes[i].style.cursor = 'url("customRed.png"), default';
                    }
                }
            }
            history.push(cmd);

        } else if (specialInput == 'connectPasswd') {

            if (cmd == 'alma') {
                response = "Connecting to server...";
            } else {
                response = "Authentication failed. Please retype password!";
            }
            let lists = document.getElementsByTagName('li');
            let list = lists[lists.length - 1];
            list.innerHTML += ' ******' + "<br />" + response;
            document.getElementById('ul').appendChild(list);
            document.getElementById('ul').scrollTop = list.offsetHeight + list.offsetTop;

            specialInput = 'none';
        }
    } else if (event.keyCode === 38) {
        arrows.play();
        if (hisCount < history.length) {
            hisCount++;
            document.getElementById('command').value = history[history.length - hisCount];
        }
    } else if (event.keyCode === 40) {
        arrows.pause();
        arrows.currentTime = 0
        arrows.play();
        if (hisCount > 0) {
            hisCount--;
            if (hisCount == 0) {
                document.getElementById('command').value = '';
            }
            else {
                document.getElementById('command').value = history[history.length - hisCount];
            }
        }
    }
});

async function start() {
    startup.play();
    document.getElementsByTagName('pre')[0].className = "glitch";
    await sleep(100);

    let startScreen = document.getElementsByClassName('startScreen')[0];
    startScreen.style.display = "none";

    var terminal = document.getElementsByClassName('terminal')[0];
    terminal.style.display = "block";

    await sleep(2000)
    beep.play();
    await sleep(70);

    let list = document.createElement('li');
    document.getElementById('ul').appendChild(list);
    list.innerHTML = 'Setting boot up conditions... [OK]<br/>';
    await sleep(500);
    list.innerHTML += 'Scanning filesystems...  [OK]<br/>';
    await sleep(500);
    list.innerHTML += 'Connecting to server...  <span class="r">[ERROR]</span><br/>Authentication required.<br/><br/>';
    await sleep(300);
    list.innerHTML += 'Onekilobit OS - Version 0.0.1<br />(C) Copyright Onekilobit Servers �̵̛̙͇̿͗͘�̷͉̗̐�̸̨͖̣̻͓̣̈́͗͗́ - �̶̨̧̨͔̗̖͎͕̒̍̈́̋̓̚�̴̧̹̻͖̦̭̬͝�̸̝̓̃̏̓̀̄͛̓͘͝. All rights reserved.';

    let list2 = document.createElement('li');
    response = 'Type any command and press Enter.<br />Type "help" to see the list of available commands.<br /><br />';
    list2.innerHTML = response;
    document.getElementById('ul').appendChild(list2);

    stage++;
}

function afterstart() {
    fan.play();
    calmMusic.play();
}


function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
String.prototype.shuffle = function () {
    var a = this.split(""),
        n = a.length;

    for (var i = n - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var tmp = a[i];
        a[i] = a[j];
        a[j] = tmp;
    }
    return a.join("");
}