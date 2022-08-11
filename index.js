const app = firebase.initializeApp({
  apiKey: "AIzaSyBb7Z-k4dLGRDPLjtlrsDusJEGQceBtvbY",
  authDomain: "realtimewebchat-39960.firebaseapp.com",
  da123tabaseURL: "https://realtimewebchat-39960-default-rtdb.firebaseio.com",
  projectId: "realtimewebchat-39960",
  storageBucket: "realtimewebchat-39960.appspot.com",
  // messagingSenderId: "133727842119",
  appId: "1:711206137885:web:9e1b4939843872ea4e16f4"
});
//-----------------------------------

let messages = firebase.database().ref('messages');
const msgList = document.querySelector('.msg-list'); //<ul>
const textMsg = document.querySelector('.text-input'); //<input>
const submitBtn = document.querySelector('.submit-btn'); //<button>
let userName = prompt('請輸入要使用的名稱')

// 寫入訊息
function addMessage() {
  messages.push({
    userName,
    message: textMsg.value,
  })
  textMsg.value = ''
}
submitBtn.addEventListener('click', addMessage)
textMsg.addEventListener('keypress', (e) => {
  if (e.key == 'Enter') {
    addMessage();
  }
})

// 顯示訊息
messages.on('value', (snapshot) => {
  let str = '';
  let data = snapshot.val();
  console.log(data);
  for (item in data) {
    if (data[item].userName == userName) {
      str += `<li class="my-msg mb-3">
      <span class="user-name mb-0 text-nowrap w-100 d-block
      text-end px-3 pt-1">${data[item].userName}</span>
      <p class="px-3 py-2 text-white">
        ${data[item].message}
      </p>
    </li>`
    } else {
      str += `<li class="msg mb-3">
      <span class="user-name mb-0 text-nowrap w-100 d-block
      text-start px-3 pt-1">${data[item].userName}</span>
      <p class="px-3 py-2 text-white">
        ${data[item].message}
      </p>
    </li>`
    }
  }
  msgList.innerHTML = str;
})

// 設定總是置底