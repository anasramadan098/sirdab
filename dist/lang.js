document.querySelector('header select').addEventListener("input", () => {
    if (document.querySelector('header select').value == 'en') {
        location.href = '/en';
    } else {
        location.href = '/';
    }
});