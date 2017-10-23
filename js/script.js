//Only execute code once pages has loaded
window.onload = function () {
    const THEONEINPUT = document.getElementById("numPanes");
    function bindInputs() {
        const PANECOUNT = THEONEINPUT.value;
        let formPanes = generatePanes(1, PANECOUNT);
        let chatFields = generateChatFields(1, PANECOUNT)
        addPanesToElement(formPanes, "messages");
        addPanesToElement(chatFields, "chat");
        init(PANECOUNT);
    }
    bindInputs();

    THEONEINPUT.onmouseup = bindInputs;
    THEONEINPUT.onkeyup = bindInputs;

}

function init(count) {
    //Find inputs on the page
    const inputChatBoxes = findInputs("chatinput", count);
    const inputNameBoxes = findInputs("nameinput", count);
    const checkBoxFanPacks = findInputs("check-fanpack", count);
    const redRadioButtons = findInputs("team-red", count);
    const blueRadioButtons = findInputs("team-blue", count);
    const allChats = findInputs("allchat", count);
    const teamChats = findInputs("teamchat", count);
    const bgList = [
        "img/bg-1.jpg",
        "img/bg-1.jpg",
        "img/bg-2.jpg",
        "img/bg-3.jpg",
        "img/bg-4.jpg",
        "img/bg-5.jpg"
    ];

    //Bind events to found inputs
    bindChatInputsToKeyEvents(inputChatBoxes, "chatmessage");
    bindChatInputsToKeyEvents(inputNameBoxes, "name");
    bindBoxToggles(checkBoxFanPacks, "chatmessage", "fanpack");
    bindBoxToggles(redRadioButtons, "name", "blue", classToggle, "red");
    bindBoxToggles(blueRadioButtons, "name", "red", classToggle, "blue");
    bindChatModeEvents(allChats, "chatmode", "[ALL] ", "[TEAM] ");
    bindChatModeEvents(teamChats, "chatmode", "[TEAM] ", "[ALL] ");
    bgSelect(bgList);
}

function addPanesToElement(panes, elementID) {
    let baseElement = document.getElementById(elementID);
    baseElement.innerHTML = "";
    panes.forEach((pane) => {
        baseElement.innerHTML += pane;
    });
}
function generatePanes(startNum, count) {
    let formPanes = [];
    for (let i = startNum; i <= count; i++) {
        let formPane = `<div class="col-md-3">
			<form>
				<h2><i class="fa fa-comment" aria-hidden="true"></i> ${i}</h2>
				<hr>
				Name
				<br/>
				<input type="text" name="name" id="nameinput${i}" value="">
				<br/>
				Team
				<br/>
				<input type="radio" name="team" id="team-blue${i}" value="blue" checked>
				<label for="team-blue${i}" class="blue"> Blue</label>&nbsp;
				<input type="radio" name="team" id="team-red${i}" value="red">
				<label for="team-red${i}" class="red"> Red</label>
				<br/>
				Chatmode
				<br/>
				<input type='radio' name="chatmode1" id='allchat${i}' checked/>
				<label for="allchat${i}"> ALL</label>&nbsp;
				<input type='radio' name="chatmode1" id='teamchat${i}' />
				<label for="teamchat${i}"> TEAM</label>
				<br/>
				<input type="checkbox" name="fanpack" id="check-fanpack${i}" value="fanpack">&nbsp;
				<img class="fanpack" src="img/fanpack.png">
				<label for="check-fanpack${i}">&nbsp;Ultimate Fanpack</label>
				<br>
				Message
				<input type="text" name="message" class="chatinput" id="chatinput${i}">
				<br>
			</form>
        </div>`;
        formPanes.push(formPane);
    }
    return formPanes;
}

function generateChatFields(startNum, count) {
    let chatFields = [];
    for (let i = startNum; i <= count; i++) {
        let chatField = `<span class="default" id="chatmode${i}">[ALL] </span>
                        <span class="blue" id="name${i}">Player${i}</span>
                        <span class="default">: </span>
                        <span class="default" id="chatmessage${i}">im magician...lol</span>
                        <br/>`;
        chatFields.push(chatField);
    }
    return chatFields;
}

// of an input to find, and how many to find. So in the format chatinput1, id is
// chatinput which it appends i onto for the complete id.
function findInputs(id, count) {
    const inputs = [];
    for (let i = 1; i <= count; i++) {
        const input = document.getElementById(`${id}${i}`);
        if (input) {
            inputs.push(input);
        }
    }
    return inputs;
}
// Accepts an array of elements and an elementID of which it needs to change,
// using i as the iterator again.
function bindChatInputsToKeyEvents(inputBoxes, elementID) {
    inputBoxes.forEach((box, i) => {
        box.onkeyup = () => document
            .getElementById(`${elementID}${i + 1}`)
            .innerHTML = box.value;
    });
}
// Accepts an array of checkbox elements, which it then puts the event handler
// to toggle a specified class name which is also passed.
function bindBoxToggles(checkBoxes, input, className, extraFunc, extraClassName) {
    checkBoxes.forEach((box, i) => {
        box.onchange = classToggle(`${input}${i + 1}`, className, extraFunc
            ? extraFunc(`${input}${i + 1}`, extraClassName)
            : 0);
    });
}

// function bindBoxToggles(boxes, elementToChangeID, funcToCall) A function to
// pass to other functions, accepts the element name (input) of what to find,
// and toggles a specific class. and then calls another function if provided.
function classToggle(input, className, next) {
    return (() => {
        document
            .getElementById(input)
            .classList
            .toggle(className);
        if (next) 
            next();
        }
    );
}
//Add event onto bgselector
function bgSelect(bgList) {
    document
        .getElementById("bg-select")
        .onchange = () => {
        const selectedBG = parseInt(document.getElementById("bg-select").value);
        document
            .getElementById("bg")
            .src = bgList[selectedBG];
    }
}
//Bind click events onto team chat modes/all chat modes
function bindChatModeEvents(chatBoxes, elementIDToChange, text1, text2) {
    chatBoxes.forEach((box, i) => {
        box.onclick = () => {
            const elementToChange = document.getElementById(`${elementIDToChange}${i + 1}`)
            if (box.checked) {
                elementToChange.innerHTML = text1;
            } else {
                elementToChange.innerHTML = text2;
            }
        }
    });
}