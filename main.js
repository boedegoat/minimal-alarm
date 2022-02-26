// Selectors
const clock = document.querySelector('.clock')
const greetingText = document.querySelector('.greeting-text')
const greetingName = document.querySelector('.greeting-name')
const alarmTime = document.querySelector('.alarm-time')

// Main process
const alarmRingtone = new Audio(
  'https://assets.mixkit.co/sfx/preview/mixkit-alarm-digital-clock-beep-989.mp3'
)
let alarmTimeout

runClock()
setInterval(runClock, 1000)
greetUser()
displayUsername()
alarmTime.addEventListener('change', (e) => {
  setAlarm(e.target.value)
})
if ('target' in localStorage) {
  setAlarm(localStorage.target)
  alarmTime.value = localStorage.target
}

// Functions
function runClock() {
  const date = new Date()
  const hours = formatTime(date.getHours())
  const minutes = formatTime(date.getMinutes())
  const seconds = formatTime(date.getSeconds())
  clock.innerHTML = `${hours} : ${minutes} : ${seconds}`
}

function formatTime(time) {
  return time < 10 ? `0${time}` : time
}

function getDayTime() {
  const date = new Date()
  const hours = date.getHours()
  let time
  if (hours < 12) time = 'morning'
  else if (hours < 18) time = 'afternoon'
  else time = 'evening'
  return time
}

function greetUser() {
  const greetMap = {
    morning: '🌅 Good Morning',
    afternoon: '🌞 Good Afternoon',
    evening: '🌙 Good Evening',
  }
  const dayTime = getDayTime()
  greetingText.innerHTML = greetMap[dayTime]
}

function changeUsername() {
  const newUsername = prompt('What is your name ?')
  if (!newUsername) return
  greetingName.innerHTML = newUsername
  localStorage.username = newUsername
}

function displayUsername() {
  let username
  if ('username' in localStorage) username = localStorage.username
  else username = 'Your Name'
  greetingName.innerHTML = username
}

function setAlarm(time) {
  if (!time) return
  if (alarmTimeout) clearTimeout(alarmTimeout)
  const current = new Date()
  const target = new Date(time)
  if (target > current) {
    const timeout = target.getTime() - current.getTime()
    if (!('target' in localStorage)) {
      Toastify({
        text: 'Alarm Set',
        position: 'center',
      }).showToast()
    }
    localStorage.target = time
    alarmTimeout = setTimeout(() => {
      alarmRingtone.play()
      alarmTime.value = ''
      delete localStorage.target
    }, timeout)
  }
}

function stopAlarm() {
  alarmRingtone.pause()
}
