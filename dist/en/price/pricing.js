const pricesPlans = {
    "yearly" : [1,2,3],
    "6-months" : [5,6,7],
    "month" : [9,10,11]
}

const plansPriceSpan = document.querySelectorAll('.pricing .plans .plan .allPrice .price')
const spans = document.querySelectorAll('.pricing .spans span');

spans.forEach(span => {
    const attr = span.getAttribute('data-plan')

    span.addEventListener('click',(e) => {
        // Change Price
        plansPriceSpan.forEach((priceSpan,index) => {
            priceSpan.innerHTML = `${pricesPlans[attr][index]}`
        });

        // Chane Active Class 
        spans.forEach(span=> span.classList.remove('active'));
        e.currentTarget.classList.add('active')
    })

});



