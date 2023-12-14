// Loop On A Elements
document.querySelectorAll('ul.admin-page a').forEach( a => {

    console.log(a);
    // Add Click Event
    a.addEventListener('click',() => {
        console.log(document.querySelector(`.${a.getAttribute('data-file')}`));
        document.querySelectorAll('.divInput').forEach(d => {
            if (d.classList.contains(a.getAttribute('data-file'))) {
                d.classList.remove('non-active')
            } else {
                d.classList.add('non-active');
            }
        })
        
        // // Remnove All Actives 

        // document.querySelector(`.${a.getAttribute('data-file')}`).classList.toggle('non-active');
    
    
        // // Change The Hidden Input Value
        // document.querySelector('input[name="filePath"]').value = a.getAttribute('data-path');
    })

})



