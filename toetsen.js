var audioSuccess = new Audio('./success.mp3');

function createContent() {
    // Create word list
    words.sort(() => Math.random() - 0.5);
    words = words.slice(0, wordCount);
    // Create HTML content
    for (let i = 0; i < wordCount; i++) {
        // Create a new label element
        let label = document.createElement("label");
            label.innerHTML = words[i];
        label.id = "label" + i;
        label.classList.add("wordLabel");
        // Create a new input element
        let input = document.createElement("input");
        input.type = "text";
        input.name = "inputBox" + i;
        input.id = "inputBox" + i;
        input.classList.add("wordInput");
        input.oninput = function() { checkInput(i); };
        input.style.width = "80ch";
        // Add row to the table with ID formTable with two columns
        let row = document.getElementById("formTable").insertRow(-1);
        let cell1 = row.insertCell(0);
        let cell2 = row.insertCell(1);
        cell1.appendChild(label);
        cell2.appendChild(input);
    }
    // Focus on the first input box
    document.getElementById("inputBox0").focus();
}

function checkInput(index) {
    let label = HtmlDecode(words[index]); //document.getElementById("label" + index).innerHTML.trim();
    let input = document.getElementById("inputBox" + index).value.trim();
    console.log(label+" "+input);
    if (input === label) {
        audioSuccess.play();
        document.getElementById("inputBox" + index).style.backgroundColor = "#88ff88";
        let n=0;
        for(let i = 0; i < wordCount; i++) {
            let l = document.getElementById("label" + i).innerHTML.trim();
            let v = document.getElementById("inputBox" + i).value.trim();
            console.log(l + " " + v);
            if(l === v) { 
                n++; 
            } else {
                setTimeout(() => { 
                    document.getElementById("inputBox" + i ).focus();
                }, 400);
                break;
            }
        }
        if(n === wordCount) {
            setTimeout(() => { 
                alert("Proficiaat, je heeft alle woorden correct ingevoerd!"); 
                location.replace("./");
            }, 800);
        }
    } else {
        document.getElementById("inputBox" + index).style.backgroundColor = "#ffdd88";
    }
}

function HtmlEncode(s) {
  var el = document.createElement("div");
  el.innerText = el.textContent = s;
  s = el.innerHTML;
  return s;
}


function HtmlDecode (str) {
    var txt = document.createElement("textarea");
    txt.innerHTML = str;
    return txt.value;
}
