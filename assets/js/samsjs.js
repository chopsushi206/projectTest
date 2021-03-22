var modalBtn = document.querySelectorAll('#modalBtn');//.modalbtn

var modal = document.querySelector('.modal');
var mainPage = document.querySelector('main');
var asidePage = document.querySelector('.ingredients');
var header = document.querySelector('.title')

console.log(modalBtn);

for (var i = 0; i < modalBtn.length; i++){
    
    modalBtn.addEventListener('click', function() {
        modal.style.display = 'block';
        mainPage.style.display = 'none';
        asidePage.style.display = 'none';
        header.style.display = 'none';
    });
    
}

document.querySelector('#closeBtn').addEventListener('click', function () {
    modal.style.display = 'none';
    mainPage.style.display = 'flex';
    asidePage.style.display = 'block';
    header.style.display = 'block';
});