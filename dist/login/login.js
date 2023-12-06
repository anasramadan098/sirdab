const signUpBtn = document.querySelector('.sign-up-btn');
const logInBtn = document.querySelector('.log-in-btn');

signUpBtn.addEventListener('click',function() {
    signUpBtn.parentElement.style.display = 'none';
    logInBtn.parentElement.style.display = 'flex';
})

logInBtn.addEventListener('click',function() {
    logInBtn.parentElement.style.display = 'none';
    signUpBtn.parentElement.style.display = 'flex';
})
