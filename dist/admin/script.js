const pass = 1234;


// Password Check
document.querySelector('.validateBtn').addEventListener('click',() => {
    if (document.querySelector('input[type="password"]').value == pass) {
        alert('Success !')
    } else {
        alert('Failure !')
    }
})