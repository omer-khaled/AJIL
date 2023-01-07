let hold  = document.querySelector('.section-eight .container h2');
let widthContainer = document.querySelector('.section-eight .container').clientWidth;
widthContainer -= 500;
let start = 50;
for(let i = 0 ; i < 5 ; i++){
    let div = document.createElement('div');
    div.classList.add('dotted');
    for(let j = 0 ; j < 50 ; j++){
        let span = document.createElement('span');
        div.appendChild(span);
    }
    hold.before(div);
    let holdDotted  = document.querySelector('.section-eight .container h2').previousElementSibling;
    holdDotted.style.left = `calc(${start + (widthContainer / 2)}px)`;
    start += 100;
}
start = 50;
for(let i = 0 ; i < 5 ; i++){
    let div = document.createElement('div');
    div.classList.add('dotted');
    for(let j = 0 ; j < 50 ; j++){
        let span = document.createElement('span');
        div.appendChild(span);
    }
    hold.before(div);
    let holdDotted  = document.querySelector('.section-eight .container h2').previousElementSibling;
    holdDotted.style.left = `calc(${start + (widthContainer / 2)}px)`;
    holdDotted.style.top = `calc(${105}%)`;
    start += 100;
}
// navigation toggel
let toggel = document.querySelector('header .container .toggel-icon');
let nav = document.querySelector('header .container nav .nav ');
let close = document.querySelector('header .container nav .nav .close');
navigation(nav);

// custom toggeler
function navigation(nav){
    toggel.onclick = function(){
        nav.classList.add('open');
    }
    close.onclick = function(){
        nav.classList.remove('open');
    }
}

// convertToArablic
convertToArablic();
function convertToArablic (){
    let button = document.querySelector('header .container .left-side .lang');
    button.onclick = function(){
        let languages = document.documentElement.getAttribute('lang');
        if(languages === 'en'){
            location.href = './index-rtl.html';
            location.open();
        }else if(languages === 'Arabic'){
            location.href = './index.html';
            location.open();
        }
    }
}

// scroll to
let links = document.querySelectorAll('header .container nav .nav li');
links.forEach(element=>{
    element.onclick = function(){
        links.forEach(elem=>{
            elem.classList.remove('li-active');
        });
        element.classList.add('li-active');
        let section = element.dataset.to;
        let sectionsAll = [...document.body.children];
        sectionsAll.forEach(ee=>{
            let distance = ee.offsetTop;
            if(ee.dataset.to === section){
                window.scrollTo({
                    top : (distance - 76),
                    behavior : 'smooth',
                });
                console.log(window.scrollY)
            }
        })
    }
});

// on loading
destroyOverlay(); 
function destroyOverlay(){
    setTimeout(()=>{
        document.querySelector('.overlay').style.opacity = '0';
    },4000);
    setTimeout(()=>{
        document.querySelector('.overlay').style.display = 'none';
    },4700);

}

// form handling 
let form = document.forms[0];
form.onsubmit = function (e){
    let user = {
        'userName' : this['name'],
        'userPass' : this['pass'],
        'userEmail' : this['email'],
        'userPhone' : this['phone'],
    };
    // 'userSubmit' : this['submit'].value,
    e.preventDefault();
    let check = false;
    for(let key in user){
        if(user[key].value === ''){
            user[key].style.border = '1px solid red';
            let text = document.createTextNode('this is empty feild');
            if(key === 'userPass'){
                user[key].parentElement.parentElement.nextElementSibling.style.color = 'red';
                user[key].parentElement.parentElement.nextElementSibling.appendChild(text);
            }else{
                user[key].parentElement.nextElementSibling.appendChild(text);
                user[key].parentElement.nextElementSibling.style.color = 'red';
            }
            check = true;
        }
    }
    if(check === false){
        let form_data = new FormData();
        for(let key in user){
            if(user[key].value != ''){
                // form_data[`${user[key].name}`] =  user[key].value;
                // form_data.set(user[key].name  , user[key].value);
                form_data.append(user[key].name , user[key].value);
            }
        }
        let ajax = new XMLHttpRequest();
        ajax.open('POST' , 'preocess_data.php' , true);
        ajax.send(form_data);
        ajax.onreadystatechange = function(){
            if(ajax.readyState == 4 && ajax.status == 200){
                // document.forms[0].reset();
                // document.getElementById('massage').innerHTML = ajax.responseText;
                if(ajax.responseText == true){
                    console.log('Done');
                    document.querySelector('.popup').classList.remove('open');
                    form.reset();
                }
            }
        }
    }
    // console.log(formKeys);
}


// handel content of user name
form['name'].oninput = function(e){
    let nam = (form['name'].value).split('');
    nam =  nam.filter(element => {
        return (/([^0-9~!@#$%&*()_+/*^-])/ig).test(element);
    });
    form['name'].value = nam.join('');
    let text = document.createTextNode('');
    this.style.border = 'unset';
    form['name'].parentElement.nextElementSibling.innerHTML = '';
}

// handel content of password 
let icon = document.getElementById('shown');
let hide = true;
icon.onclick = function(){
    if(hide){
        form['pass'].type = 'text';
        hide = false;
        icon.className = 'fa-sharp fa-solid fa-eye';
    }else{
        form['pass'].type = 'password';
        hide = true;
        icon.className = 'fa-solid fa-eye-slash';
    }
}
form['pass'].oninput = function(e){
    let nam = (form['pass'].value).split('');
    if((/([a-zA-Z])/ig.test(form['pass'].value)) && (/([0-9])/ig.test(form['pass'].value)) && (/(\W)/ig.test(form['pass'].value))){
        console.log('valid');
    }
    form['pass'].value = nam.join('');
    let text = document.createTextNode('');
    this.style.border = 'unset';
    form['pass'].parentElement.parentElement.nextElementSibling.innerHTML = '';
}

// Handel Email
form['email'].oninput = function(e){
    let nam = (form['email'].value).split('');
    if((/[a-zA-z0-9\W]+@gmail.com/ig.test(form['email'].value))){
        console.log('valid');
    }
    form['email'].value = nam.join('');
    let text = document.createTextNode('');
    this.style.border = 'unset';
    form['email'].parentElement.nextElementSibling.innerHTML = '';
}

// Handel Phone
// [1-9]{10}
form['phone'].oninput = function(e){
    let nam = (form['phone'].value).split('');
    // ^0[1-9]{10} 01228703875
    nam =  nam.filter(element => {
        return (/([^a-zA-Z~!@#$%&*()_+/^-])/ig).test(element);
    });
    if((/^01(0|1|2|5)[0-9]{8}/ig.test(form['phone'].value))){
        console.log('valid');
    }
    form['phone'].value = nam.join('');
    let text = document.createTextNode('');
    this.style.border = 'unset';
    form['phone'].parentElement.nextElementSibling.innerHTML = '';
}


// onclick start sign
let buttttons = [...document.querySelectorAll('.go')];
buttttons.forEach(element=>{
    element.onclick = function(){
        document.querySelector('.popup').classList.add('open');
    }
});


// clsoe poput
document.querySelector('.popup .toggel-icon').onclick = function(){
    this.parentElement.classList.remove('open');
    form.reset();
}

// choises images
let images_buttons = [...document.querySelectorAll('.section-eight .container .data .choises img')];
images_buttons.forEach(element=>{
    element.onclick = function(){
        document.querySelectorAll(`.section-eight .container .data .details`).forEach(elem=>{
            elem.classList.add('d-none');
        });
        let number = this.dataset.number;
        let cure = document.querySelector(`.section-eight .container .data .details:nth-child(${number})`);
        cure.classList.remove('d-none');
        cure.classList.add('anim');
    }
});


// on scroll incretment
let started = true;
let parentspansNumbers = document.querySelector('.section-six .container');
let spansNumbers = document.querySelectorAll('.section-six .container .data .details div span:nth-child(1)');
window.onscroll = function(){
    if(parentspansNumbers.getBoundingClientRect().top <= 0 && started){
        console.log('Done');
        spansNumbers.forEach(element=>{
            let start = 0;
            let handel = setInterval(()=>{
                let target =  Number(element.dataset.end);
                if(start < target){
                    element.innerHTML = start + 'k';
                    start++;
                }else{
                    clearInterval(handel);
                }
            },20);
        });
        started = false;
    }
    spansNumbers.forEach(element=>{
        console.log();
        // console.log(element.clientHeight);
        // if(){
            // console.log('done');
            // let handel = setInterval(()=>{
            //     let start = 0;
            //     let target =  element.dataset.end;
            //     while(start < target){
            //         element.innerHTML = start + 'k';
            //         start++;
            //     }
            //     clearInterval(handel);
            // },1000)
        // }else{
            // spansNumbers.forEach(element=>{
            //     element.innerHTML = '0K';
            // });
        // }
    });
}

// slider smooth