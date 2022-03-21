// const { response } = require("express")

console.log('Client side JS')
fetch('http://puzzle.mead.io/puzzle').then((response) => {
    response.json().then((data) => {
        console.log(data)
    })
})



const formAction = document.querySelector('form')
const search = document.querySelector('input')
const messageone = document.querySelector('#message-1')
const messagetwo = document.querySelector('#message-2')
messageone.textContent = ''
messagetwo.textContent = ''
formAction.addEventListener('submit', (e) => {
    e.preventDefault()
    const location = search.value
    console.log('Testing!'+ location)
    messagetwo.textContent = 'Loading....'
    fetch('http://localhost:3000/weather?address='+ location).then((response) => {
    response.json().then((data) => {
        if(data.error) {
            console.log(data.error)
            messagetwo.textContent = ''
            messageone.textContent = data.error
        }else {
            console.log(data)
            messageone.textContent = ''
            messagetwo.textContent = data.location
        }
    })
})
})