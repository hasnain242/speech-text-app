const toggleBtn = document.getElementById('toggle');
const customTextContainer = document.getElementById('custom-text');
const closeBtn = document.getElementById('close');
const voicesDropdown = document.getElementById('voices');
const customText = document.getElementById('text');
const readBtn = document.getElementById('read');
const main = document.getElementById('main');

const data = [
    {
        image: './img/angry.jpg',
        text: "I'm Angry"
    },
    {
        image: './img/drink.jpg',
        text: "I'm Thirsty"
    },
    {
        image: './img/food.jpg',
        text: "I'm Hungry"
    },
    {
        image: './img/grandma.jpg',
        text: "I'm Miss Grandma"
    },
    {
        image: './img/happy.jpg',
        text: "I'm Happy"
    },
    {
        image: './img/home.jpg',
        text: "I want to go home"
    },
    {
        image: './img/hurt.jpg',
        text: "I'm Hurt"
    },
    {
        image: './img/outside.jpg',
        text: "I like the outdoors"
    },
    {
        image: './img/sad.jpg',
        text: "I don't like being sad"
    },
    {
        image: './img/scared.jpg',
        text: "I'm scary"
    },
    {
        image: './img/school.jpg',
        text: "Long time since I went to school"
    },
    {
        image: './img/tired.jpg',
        text: "I'm so tired"
    },
];

let voicesArray = [];

function createUIElement(predefinedObject) {
    const { image, text } = predefinedObject;
    const div = document.createElement('div');
    div.classList.add('box');
    div.innerHTML = `
        <img src="${image}" alt=${text} />
        <p class="imageInfo">${text}</p>
    `;
    div.addEventListener('click', () => {
        setText(text);
        speakText();
    });

    main.appendChild(div);
};

const message = new SpeechSynthesisUtterance();

function setText(text) {
    message.text = text;
};

function speakText() {
    speechSynthesis.speak(message);
}

const speech = window.speechSynthesis;

function fetchVoices() {
    if(speech.onvoiceschanged !== undefined) {
        speech.onvoiceschanged = () => renderVoices();
    }
};

function renderVoices() {
	const voices = speech.getVoices(); 
    voicesArray = voices;
    voicesArray.forEach((voice) => {
        let option = document.createElement('option');
        option.textContent = `${voice.name} ${voice.lang}`;
        if ( voice.default ) {
            option.textContent += '(DEFAULT VOICE)';
        }
        option.setAttribute('data-lang', voice.lang);
        option.setAttribute('data-name', voice.name);
        voicesDropdown.appendChild(option);
    })
};

fetchVoices();

data.forEach(createUIElement);

toggleBtn.addEventListener('click', () => {
    customTextContainer.classList.toggle('show');
})

closeBtn.addEventListener('click', () => {
    customTextContainer.classList.remove('show');
})

speechSynthesis.addEventListener('voiceschanged', fetchVoices);

readBtn.addEventListener('click', () => {
    console.log(customText.value);
    setText(customText.value);
    speakText();
})