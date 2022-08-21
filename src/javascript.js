import { initializeApp } from 'firebase/app';
import { getDatabase, onValue, ref, set } from "firebase/database";
import React, { useState } from "react";

var firebaseConfig = {
    apiKey: "AIzaSyBaUHVZ1-vDV6dr1TKTRkd84-01IDr4wDI",
    authDomain: "safechat-2f29c.firebaseapp.com",
    databaseURL: "https://safechat-2f29c-default-rtdb.firebaseio.com",
    projectId: "safechat-2f29c",
    storageBucket: "safechat-2f29c.appspot.com",
    messagingSenderId: "841305880682",
    appId: "1:841305880682:web:72fd433f03b3c17036b213",
    measurementId: "G-LG5CM9TJP5"
};

const app = initializeApp(firebaseConfig);

// initialize database
const db = getDatabase(app);

const username = prompt("Please Tell Us Your Name");

export function Form() {
    const [message, setMessage] = useState('')
    const handleChange = e => { setMessage(e.target.value) }
    const handleSubmit = event => {
        console.log('handleSubmit ran');
        event.preventDefault(); // 👈️ prevent page refresh

        // 👇️ access input values here
        writeMessage(username, message);

        // 👇️ clear all input values in the form
        setMessage('');
    };

    return (
        <form onSubmit={handleSubmit}>
            <input id="message-input" type="text" value={message} onChange={handleChange} />
            <button type="submit" id="message-btn">Submit</button>
        </form>

    );
}

function writeMessage(username, message) {
    console.log(username, message)
    const timestamp = Date.now();
    set(ref(db, "messages/" + timestamp), {
        username,
        message,
    });
}

// display the messages
// reference the collection created earlier
const fetchChat = ref(db, 'messages/');

// check for new messages using the onValue event listener
function messageAppend(messages) {
    const message = `<li class=${username === messages.username ? "sent" : "receive"}><span>${messages.username}: </span>${messages.message}</li>`;
    // append the message on the page
    document.getElementById("messages").innerHTML += message;
}

function messageClear() {
    document.getElementById("messages").innerHTML = ''
}
onValue(fetchChat, function (snapshot) {
    messageClear();
    const messages = snapshot.forEach(function (childSnapshot) {
        // childData will be the actual contents of the child
        var childData = childSnapshot.val();
        console.log(childData);
        messageAppend(childData);
    });
    console.log(messages);

});

