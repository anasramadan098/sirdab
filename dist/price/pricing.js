const pricesPlans = {
    // ١٧٥٤.١ | ١٢١٤.١ | ٨٤٩ 
    "yearly" : [849,1214.1,1754.1 ],
    "6-months" : [425,602.6,985.5],
    "month" : [50.5,102.1,170.02]
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



