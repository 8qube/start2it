// =============================================
// Dependencies
let libs = [
    "https://cdnjs.cloudflare.com/ajax/libs/jquery/3.3.1/jquery.min.js",
    "https://cdnjs.cloudflare.com/ajax/libs/jquery-contextmenu/2.7.1/jquery.contextMenu.min.js",
    "https://cdnjs.cloudflare.com/ajax/libs/jquery-contextmenu/2.7.1/jquery.ui.position.js"
];
let stls = [
    "https://cdnjs.cloudflare.com/ajax/libs/jquery-contextmenu/2.7.1/jquery.contextMenu.min.css"
];
for(let u=0; u < libs.length; u++) { var script = document.createElement("script"); script.src = libs[u]; document.head.appendChild(script);}
for(let v=0; v < stls.length; v++) {var link = document.createElement("link"); link.rel = "stylesheet"; link.href = stls[v]; document.head.appendChild(link);}
// =============================================

var audioSuccess = new Audio('./success.mp3');
var hits= {};

function createContentScroll() {
    // Create word list
    words.sort(() => Math.random() - 0.5);
    words = words.slice(0, wordCount);
    console.log(words);
    // Create HTML content
    for (let i = 0; i < wordCount; i++) {
        // Create a new div element
        let outer = document.createElement("div");
        outer.classList.add("scrollContainer");
        outer.id = "scrollContainer" + i;
        outer.style.height = "300px";
        outer.style.width = "300px";
        outer.style.overflow = "scroll";
        outer.style.border = "15px solid white";
        let inner = document.createElement("div");
        inner.classList.add("scrollContent");
        inner.id = "scrollContent" + i;
        inner.style.height = "1024px";
        inner.style.width = "1024px";
        let img = document.createElement("img");
        console.log("./img/zoek_"+words[i]+".jpg");
        img.src = "./img/zoek_"+words[i]+".jpg";
        img.useMap = "#imgMap" + i;
        // Create a map element
        let map = document.createElement("map");
        map.name = "imgMap" + i;
        let area = document.createElement("area");
        area.shape = "rect";
        area.coords = wordPos[words[i]];
        area.href = "javascript:checkInput(" + i + ");";
        map.appendChild(area);
        inner.appendChild(map);
        inner.appendChild(img);
        outer.appendChild(inner);       
        // Add row to the table with ID formTable with two columns
        let cell1 = document.getElementById("formRow").insertCell(0);
        cell1.id = "cell" + i;
        cell1.innerHTML = "zoek de <b>"+words[i]+"</b> en klik erop";
        cell1.appendChild(outer);
    }
    // Focus on the first input box
    //document.getElementById("inputBox0").focus();
}

function checkInput(index) {
    hits["img"+index] = true;
    let label = words[index];
    audioSuccess.play();
    // set border color of the container to green
    document.getElementById("scrollContainer" + index).style.borderColor = "#88ff88";
    let len = Object.keys(hits).length;
    console.log(hits);
    if(len === wordCount) {
        setTimeout(() => { 
            alert("Proficiaat, je heeft alle beelden geklikt!"); 
            location.replace("./index.html");
        }, 800);
    }
}
