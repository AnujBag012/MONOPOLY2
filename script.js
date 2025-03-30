

// run();

let randomNum=0;
let pos1=0;
let pos2=0;
// let score1=0;
// let score2=0;
let cnt=0;
let cell = document.getElementsByClassName("card");
let button = document.createElement("button");
button.classList.add("button");
button.innerText = "SHOW";

button.addEventListener("click", askGemini);

let pointer = document.createElement("div");
pointer.classList.add("pointer");

let pointer2 = document.createElement("div");
        pointer2.classList.add("pointer2");

function pointerPosition(){
    if(cnt==0){
        pos1 = (pos1+randomNum)%10;
        document.querySelectorAll(".card").forEach(cell => cell.innerHTML = "<p style='color: yellow; font-size: larger; font-weight: 700;'>MONOPOLY</p>");
        // let pointer = document.createElement("div");
        // pointer.classList.add("pointer");
        document.querySelectorAll(".card")[pos1].appendChild(pointer);
        document.querySelectorAll(".card")[pos2].appendChild(pointer2);
        document.querySelectorAll(".card")[pos1].appendChild(button);
        cnt++;
    }
    else{
        pos2 = (pos2+randomNum)%10;
        document.querySelectorAll(".card").forEach(cell => cell.innerHTML = "<p style='color: yellow; font-size: larger; font-weight: 700;'>MONOPOLY</p>");
        // let pointer2 = document.createElement("div");
        // pointer2.classList.add("pointer2");
        document.querySelectorAll(".card")[pos2].appendChild(pointer2);
        document.querySelectorAll(".card")[pos1].appendChild(pointer);
        document.querySelectorAll(".card")[pos2].appendChild(button);
        cnt--;
    }
}

function generateRandomNumber() {
    randomNum = Math.floor(Math.random() * 4) + 1; // Generates a number between 1 and 4
    document.getElementById("randomNumber").innerText = randomNum;

    pointerPosition();
}

function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

let outputQ="";

async function askGemini() {
    // await delay(2000);
    // const apiKey = "AIzaSyDuURSLnMqf6nYasgC3wTYSqwycULjz12k"; // Replace with your API Key
    // const userInput = document.getElementById("userInput").value;
    const userInput = "Ask a question in science, moral science and global history for primary level student with 4 options and another option 'I don't know', please don't show the answer and the questions must not be repeated if already answered.";
    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-pro-latest:generateContent?key=AIzaSyCIjP0NENyJRgl-cW1lPT6LXJwCMsNvKrs`;

    const requestData = {
        contents: [{ parts: [{ text: userInput }] }]
    };

    try {
        const response = await fetch(apiUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(requestData)
        });

        const data = await response.json();
        console.log(data);

        // Extract response text
        outputQ = data?.candidates?.[0]?.content?.parts?.[0]?.text || "No response";
        document.getElementById("responsed").innerText = outputQ;

    } catch (error) {
        console.error("Error:", error);
        document.getElementById("response").innerText = "Error fetching response!";
    }
}

let output="";
let ans=document.getElementById("ans");
let score1=0;
let score2=0;
async function askGeminiAns() {
    ans = document.getElementById("ans");
    const userInput1 = outputQ+"\n\ncheck the answer is given by me right or wrong? Reply in one word Yes for right and No for wrong answer\n\n" + "ans = "+ans.value;
    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=AIzaSyAK9J-CbcV7t50KtmFcOB2llaYlu3rYqQ0`;
    
    const requestData1 = {
        contents: [{ parts: [{ text: userInput1 }] }]
    };

    try {
        const response1 = await fetch(apiUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(requestData1)
        });

        const data = await response1.json();
        console.log(data);

        // Extract response text
        output = String(data?.candidates?.[0]?.content?.parts?.[0]?.text) || "No response";
        document.getElementById("responsed-ans").innerText = output;

    } catch (error) {
        console.error("Error:", error);
        document.getElementById("responsed-ans").innerText = "Error fetching response!";
    }

    if(cnt==1){
        let ans1 = document.getElementById("ans").value;
        let output1 = document.getElementById("responsed-ans").innerText;
        console.log(output1);
        // score1=0;
        if(ans1 == "No answer" || ans1 == "no answer" || ans1 == "No Answer" || ans1 == "NO ANSWER"|| ans1=="E"||ans1=="e"){
            score1+=0;
            document.getElementById("score1").innerHTML = "SCORE1: "+score1;
        }
        else if(output1.trim().toLowerCase() === "yes"){
            score1+=10;
            document.getElementById("score1").innerHTML = "SCORE1: "+score1;
        }
        else if(output1.trim().toLowerCase() === "no"){
            score1-=10;
            document.getElementById("score1").innerHTML = "SCORE1: "+score1;
        }
        
        console.log(score1);
    }
    else{
        let ans1 = document.getElementById("ans").value;
        let output1 = document.getElementById("responsed-ans").innerText;
        if(ans1 == "No answer" || ans1 == "no answer" || ans1 == "No Answer" || ans1 == "NO ANSWER" || ans1=="E"||ans1=="e"){
            score2+=0;
            document.getElementById("score2").innerHTML = "score2: "+score2;
        }
        else if(output1.trim().toLowerCase() === "yes"){
            score2+=10;
            document.getElementById("score2").innerHTML = "score2: "+score2;
        }
        else if(output1.trim().toLowerCase() === "no"){
            score2-=10;
            document.getElementById("score2").innerHTML = "score2: "+score2;
        }
    }


}

