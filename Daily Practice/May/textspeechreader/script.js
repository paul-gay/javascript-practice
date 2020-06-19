const main = document.querySelector('main');
const voicesSelect = document.getElementById('voices');
const textArea = document.getElementById('text');
const readBtn = document.getElementById('read');
const toggleBtn = document.getElementById('toggle');
const closeBtn = document.getElementById('close');

const data = [
    {
        image: './img/drink.jpg',
        text: "I'm Thirsty"
    },
    {
        image: './img/food.jpg',
        text: "I'm Hungry"
    },
    {
        image: './img/tired.jpg',
        text: "I'm Tired"
    },
    {
        image: './img/hurt.jpg',
        text: "I'm Hurt"
    },
    {
        image: './img/happy.jpg',
        text: "I'm Happy"
    },
    {
        image: './img/angry.jpg',
        text: "I'm Angry"
    },
    {
        image: './img/sad.jpg',
        text: "I'm Sad"
    },
    {
        image: './img/scared.jpg',
        text: "I'm Scared"
    },
    {
        image: './img/outside.jpg',
        text: 'I Want To Go Outside'
    },
    {
        image: './img/home.jpg',
        text: 'I Want To Go Home'
    },
    {
        image: './img/school.jpg',
        text: 'I Want To Go To School'
    },
    {
        image: './img/grandma.jpg',
        text: 'I Want To Go To Grandmas'
    }
];


data.forEach(createBox);

/* create speech boxes */
function createBox(item) {
    const box = document.createElement('div');

    // destructure
    // get image and text from each item in array since each item is an object has image and text properties
    const { image, text } = item;
    // can now just use image and text rather than item.text and item.image

    box.classList.add('box');
    box.innerHTML = `
        <img src="${image}" alt="${text}"/>
        <p class="info">${text}</p>
    `;

    box.addEventListener('click', () => {
        setTextMessage(text);
        speakText();

        // add active effect class to box
        box.classList.add('active');
        // then quickly remove active class
        setTimeout(() => box.classList.remove('active'), 800);
    });

    main.appendChild(box);
};

/* init speech synthesis */
//represents a speech request. It contains the content the speech service should read and information about how to read i
// contains the message you want browser to read aloud
const message = new SpeechSynthesisUtterance();


/* store voices in array */
let voices =[];

function getVoices() {
    // Returns a list of SpeechSynthesisVoice objects representing all the available voices on the current device.
    voices = speechSynthesis.getVoices();

    voices.forEach(voice => {
        const option = document.createElement('option');
        option.value = voice.name;
        option.innerText = `${voice.name} ${voice.lang}`;

        voicesSelect.appendChild(option);
    });
};

/* set text */
function setTextMessage(text) {
    message.text = text;
}

/* speak the text */
function speakText() {
    speechSynthesis.speak(message);
}

/* set voice */
function setVoice(e) {
    message.voice = voices.find(voice => voice.name === e.target.value);
}


/* voices changed event */
speechSynthesis.addEventListener('voiceschanged', getVoices);


/* toggle text box */
toggleBtn.addEventListener('click', () => 
    document.getElementById('text-box').classList.toggle('show')
);

/* close text box */
closeBtn.addEventListener('click', () =>
    document.getElementById('text-box').classList.remove('show')
);

/* change voice */
voicesSelect.addEventListener('change', setVoice);

/* read text button */
readBtn.addEventListener('click', () => {
    setTextMessage(textArea.value);
    speakText();
});


getVoices();