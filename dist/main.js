// Questions Step

const questions = [
    {q:"q",a:'a'},
    {q:"qq",a:'aa'},
    {q:"qqq",a:'aaa'},
    {q:"qw",a:'aw'},
    {q:"q",a:'a'},
    {q:"q",a:'a'},
]

const questionsHolder = document.querySelector('.questions');

questions.map(question => {
    // Create Q-Holder
    const qHolder = document.createElement('div');
    qHolder.className = 'q-holder';

    // Create Q Div
    const qDiv = document.createElement('div');
    qDiv.className = 'q';
    
    // Craete Quesition 
    const questionElement = document.createElement('h4');
    questionElement.innerHTML = question.q;
        // Append It In Q Div
        qDiv.appendChild(questionElement);

    // Craete Quesition 
    const iconElement = document.createElement('i');
    iconElement.className = 'fa-solid fa-plus arrow';
        // Append It In Q Div
        qDiv.appendChild(iconElement);

    // Append QDiv To QHolder
    qHolder.appendChild(qDiv);

    // Create Answer
    const answerElement = document.createElement('p');
    answerElement.innerHTML = question.a;
    // Append It In QHolder
    qHolder.appendChild(answerElement);


    // Click Event
    qHolder.addEventListener('click',function(e) {
        // Loop On All Elements To Remove Active Class
        document.querySelectorAll('.questions .q-holder').forEach(e => e.classList.remove('active'));

        // Set Active Class On Current Element
        e.currentTarget.classList.toggle('active');
    })



    // Append It To Question Holder
    questionsHolder.appendChild(qHolder);
})



// How Section
const animatedCircle = document.querySelector('.line .circle');
const stepsElements = document.querySelectorAll('.steps .step');

// Set Line Height
// document.querySelector('.line').style.height = animatedCircle.parentElement.parentElement.scrollHeight;


window.addEventListener('scroll' , () => {
    let myScrollY = document.querySelector('.how').clientHeight / 2.2;
    if (scrollY >= myScrollY) {
        let height = scrollY - myScrollY - 150 
        animatedCircle.style.top = `${height}px`;
        document.querySelector('.line .active-line').style.height = height + 'px'
    }

    stepsElements.forEach(e => {
        if (scrollY >= e.getAttribute('data-scroll')) {
            e.classList.add('active')
        }
        if (scrollY < e.getAttribute('data-scroll')) {
            e.classList.remove('active');
        }

    })
})


function removeActiveClassesFrom(elements) {
    elements.forEach(e=> e.classList.remove('active'));
}  