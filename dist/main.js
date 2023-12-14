


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



// Click Event
document.querySelectorAll('.questions .q-holder').forEach(el => {
    el.addEventListener('click', function(e) {
        // Loop On All Elements To Remove Active Class
        document.querySelectorAll('.questions .q-holder').forEach(e => e.classList.remove('active'));
    
        // Set Active Class On Current Element
        e.currentTarget.classList.toggle('active');
    })
})



document.querySelectorAll('body *:not(div,section,ul,i,img,footer,header,li,select)').forEach((e,i) => e.id = i );