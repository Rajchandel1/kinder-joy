function select(data){
    return document.querySelector(`${data}`)
}

// function cardMove(){

// var cover = select(".cover")

// let offsetX, offsetY

// function move(e){
//     cover.style.left = `${e.clientX - offsetX}px`
//     cover.style.top = `${e.clientY - offsetY}px`
//     cover.style.cursor = "grabbing"
//     console.log("abhi hila rha hai")
// }

// cover.addEventListener("mousedown",(e)=>{
//     offsetX = e.clientX - cover.offsetLeft
//     offsetY = e.clientY - cover.offsetTop
//     cover.style.cursor = "grab"
//     document.addEventListener("mousemove",move)
//     console.log("dabaya abhi")
// })

// document.addEventListener("mouseup",()=>{
//     document.removeEventListener("mousemove",move)
//     cover.style.cursor = "grab"
//     console.log("chod diya")
// })

// }

var wrapper = select(".wrapper")

var cover = select(".cover")

var toy = select(".surprise-item img")

var ToyName = select(".toy-bg h1")

var bg = select(".toy-bg")

var msg = select(".toy-bg h1")

var box = select(".surprise-item")

var clickTxt = select(".surprise-item p")

var header = select(".header")

var toys = [
    { img: "./images/boy bookmark.png",
      name: "Cedric Bookmark",
      message: "Whoa! You just unlocked Cedric! Hufflepuff pride! 🦡✨"   
    },
    { img: "./images/castle sticky note.png",
      name: "Castle Sticky Note",
      message: "A magical castle for your notes! Hogwarts vibes! 🏰✨"
    },
    { img: "./images/cho.png",
      name: "Cho",
      message: "Wow! Cho Chang just flew into your Kinder Joy! 🦅💙"
    },
    { img: "./images/dobby.png",
      name: "Dobby",
      message: "Guess what? Dobby is free… and he's your surprise! 🧦✨"
    },
    { img: "./images/draco.png",
      name: "Draco",
      message: "Whoa! You just unlocked Draco! Slytherin approves! 🐍✨"
    },
    { img: "./images/dumbled.png",
      name: "Dumbledore",
      message: "Dumbledore’s wisdom is now yours! You got Dumbledore! 🧙‍♂️✨"
    },
    { img: "./images/hagrid.png",
      name: "Hagrid",
      message: "Hagrid says: ‘Yer a wizard!’ because you got Hagrid! 🏰🐉"
    },
    { img: "./images/harry.png",
      name: "Harry",
      message: "WHOAAA! Harry Potter just apparated into your Kinder Joy, You're Chosen One! ⚡🦉"
    },
    { img: "./images/hermione_bookmark.png",
      name: "Hermione",
      message: "Yayyy! Hermione is here to cast a spell of happiness! 🪄📚"
    },
    { img: "./images/luna.png",
      name: "Luna",
      message: "Lucky you! Luna Lovegood has appeared with dreamy vibes! 🌙✨"
    },
    { img: "./images/mcgonagal.png",
      name: "McGonagall",
      message: "McGonagall approves this message: You found McGonagall! 🐱📜"
    },
    { img: "./images/moody.png",
      name: "Moody",
      message: "Constant vigilance! You got Mad-Eye Moody! 👁️⚡"
    },
    { img: "./images/ron.png",
      name: "Ron",
      message: "Ahh! Ron is here, but did he bring some chocolate frogs? 🐸🍫"
    },
    { img: "./images/snape.png",
      name: "Snape",
      message: "Omg! You found Snape! But will he smile? 🤨🖤"
    },
    { img: "./images/train sticky note.png",
      name: "Train Sticky Note",
      message: "All aboard! Your Hogwarts Express sticky notes are here! 🚂💌"
    }
];


randomItem = Math.floor(Math.random()*toys.length)

console.log(toys[randomItem].img)

function drag(){

Draggable.create("#cover", {
    type: "x,y",
    bounds: document.getElementById("wrapper"),
    inertia: true,
    onClick: function () {
    },
    onDragEnd: function () {
        setTimeout(() => {
            cover.style.transition = "opacity 0.5s ease-out";
            cover.style.opacity = "0";
            
            // Animation complete hone ke baad element hatao
            setTimeout(() => {
                cover.style.display = "none";
            }, 2000);
        }, 2000);
    },
    liveSnap: {
        points: [
          { x: 0, y: 0 },
          { x: 100, y: 0 },
          { x: 200, y: 50 },
        ],
        radius: 15,
      },
  });
}

drag()

function ShowToys(){
    toy.src = toys[randomItem].img
}

toy.addEventListener("click",()=>{
    bg.style.display = "block"
    toy.style.scale = "2"
        cover.style.transition = "opacity 0.5s ease-out";
        cover.style.opacity = "0";
            cover.classList.add("close");
    msg.textContent = toys[randomItem].message
    clickTxt.classList.add("close")
  header.classList.add("close")
    launchConfetti()
})


ShowToys()



function launchConfetti() {
    // Confetti effect
    confetti({
        particleCount: 100,  // Number of confetti particles
        spread: 90,          // Spread of the confetti
        origin: { x: 0.5, y: 0.5 },  // Origin point at the center of the screen
        colors: ['#ff0000', '#00ff00', '#0000ff', '#ff9900', '#9933cc'], // Confetti colors
        shapes: ['circle', 'square'],  // Confetti shapes
    });
}

document.addEventListener("DOMContentLoaded", function () {
  const header = select(".header h1");

  if (window.location.search) {
      const params = new URLSearchParams(window.location.search);
      const uuid = params.get("id");

      if (uuid) {
          // Retrieve the message from localStorage using the UUID
          const messageData = JSON.parse(localStorage.getItem(uuid));

          if (messageData) {
              const { from, to, message } = messageData;

              // Display the 'from' and 'to' names and the message on the toy page
              ToyName.textContent = `${from} to ${to}`;
              msg.textContent = message;

              // Dynamically update the header
              header.innerHTML = `This is For You ${to} from ${from}:<br> ${message}`;

              // Trigger confetti
              launchConfetti();
          } else {
              console.error("Message not found.");
          }
      } else {
          console.error("Invalid URL.");
      }
  }
});

const sendBtn = select(".send-btn");
const messageForm = select(".message-form");
const submitBtn = select("#submit-btn");
const linkSection = select(".generated-link");
const linkElement = select("#link");
const fromInput = select("#from");
const toInput = select("#to");
const messageInput = select("#message");

let generatedLink = "";

sendBtn.addEventListener("click", () => {
  messageForm.style.display = "block";
  sendBtn.style.display = "none";
});

submitBtn.addEventListener("click", () => {
  const from = fromInput.value || "Anonymous";
  const to = toInput.value || "Someone special";
  let message = messageInput.value || "You have received a special Kinder Joy surprise!";

  // Generate a unique identifier
  const uuid = generateUUID();

  // Store the message in localStorage with the UUID as the key
  const messageData = { from, to, message };
  localStorage.setItem(uuid, JSON.stringify(messageData));

  // Create a unique URL with the UUID as a query parameter
  const url = new URL(window.location.href);
  url.searchParams.set("id", uuid);

  // Set the generated link and show it to the user
  generatedLink = url.toString();
  linkElement.href = generatedLink;
  linkElement.textContent = "Send Love";
  linkSection.style.display = "block";
});

// Add event listener for the copy button
const copyBtn = select("#copyBtn");

copyBtn.addEventListener("click", () => {
  const linkText = linkElement.href;

  // Use the Clipboard API to copy the link to the clipboard
  navigator.clipboard.writeText(linkText).then(() => {
    copyBtn.textContent = "Copied!!"
    copyBtn.style.backgroundColor = "#45a049"
    }).catch((error) => {  }).catch((error) => {
      console.error("Failed to copy the link: ", error);
  });
});

function generateUUID() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = Math.random() * 16 | 0,
          v = c === 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
  });
}