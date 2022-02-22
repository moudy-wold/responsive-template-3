// background Image
let main = document.querySelector('.main'),
    ulLinks = document.querySelector('.header .links ul'),
    links = document.querySelectorAll('.header ul li a'),
    linksMenuBtn = document.querySelector('.header .links-menu'),
    linksMenuBtnSpan = document.querySelectorAll('.header .links-menu span'),
    imgArr = ["url('./imgs/hplaptop-1.jpg')",
        "url('./imgs/148423.jpg')",
        "url('./imgs/13219.jpg')"
    ],
    randomImg = 0,
    counter,
    // setting Box
    settingBox = document.querySelector('.setting-box'),
    iconSet = document.querySelector('.icon'),
    settingContainer = document.querySelector('.setting-container'),
    // color Setting opition
    colors = document.querySelectorAll('.colors ul li'),
    colorLocalArr = [],
    miniColor,
    // Random Background opition
    buttonForSelect = document.querySelectorAll('.opition-box .forSelect'),
    changeBackground,
    background,
    showBullets,
    //Ul Bullets List 
    ulBulletsList = document.querySelector('.ulBulletList');

document.addEventListener('click', (e) => {
    e.stopPropagation();
    if (e.target.classList.contains('links-menu') || e.target == linksMenuBtnSpan[0] || e.target == linksMenuBtnSpan[1] || e.target == linksMenuBtnSpan[2]) {
        ulLinks.classList.toggle('close');
        ulLinks.classList.toggle('open');
        e.target.classList.toggle('active');
    } else if (e.target !== linksMenuBtn && e.target !== ulLinks) {
        ulLinks.classList.add('close');
        ulLinks.classList.remove('open');
        linksMenuBtn.classList.remove("active");

    }

})

//Local Storage for Background
let backgroundLocal = localStorage.getItem('background');

if (localStorage.background !== null) {
    background = JSON.parse(backgroundLocal)
    main.style.backgroundImage = background;
} else {
    background = imgArr[0];
}

//function Counter Random Background 
function counterFun() {
    counter = setInterval(() => {
        randomImg = Math.floor(Math.random() * imgArr.length)
        background = imgArr[randomImg]
        main.style.backgroundImage = background;
        window.localStorage.setItem("background", JSON.stringify(background))
    }, 1225)
}
counterFun()

//open setting Opition
iconSet.onclick = () => {
    iconSet.classList.toggle('fa-spin');
    settingBox.classList.toggle('active');
}


// Set li`s Color
colors.forEach((li) => {
    li.style.backgroundColor = li.dataset.color
})


// loop on lis For Set page`s Main Color
colors.forEach((color) => {
    color.onclick = function() {
        colorLocalArr[0] = this.dataset.color;
        window.localStorage.setItem('colo', JSON.stringify(colorLocalArr[0]))
        for (let i = 0; i < colors.length; i++) {
            colors[i].classList.remove('active');
        }
        this.classList.add('active')
        document.documentElement.style.setProperty('--main--color', this.dataset.color)
    }
})

// Set default Color From Local Storage
miniColor = localStorage.getItem('colo');

if (miniColor !== null) {
    document.documentElement.style.setProperty('--main--color', JSON.parse(miniColor))

    colors.forEach((li) => {
        li.classList.remove('active')
        if (JSON.parse(miniColor) == li.dataset.color) {
            li.classList.add('active');
        }
    })

}


//Set Opition Random Backround With Local
let checkBackLoacal = localStorage.getItem('chackeBack');

if (localStorage.getItem("chackeBack") !== null) {
    if (checkBackLoacal === "yes") {
        buttonForSelect.innerHTML = 'YES'
        changeBackground = "no";
        clearInterval(counter);
        buttonForSelect[0].classList.add('active');
    } else {
        buttonForSelect[0].innerHTML = "NO"
        changeBackground = "yes";
    }
} else {
    changeBackground = "yes"
}
//Set Bullets Opition With Local
let checkBulletsLoacal = localStorage.getItem('chackeBullets');

if (localStorage.getItem("chackeBullets") !== null) {
    if (checkBulletsLoacal === "yes") {
        buttonForSelect[1].innerHTML = 'YES'
        showBullets = "no";
        ulBulletsList.style.display = 'none';
        buttonForSelect[1].classList.add('active');
    } else {
        buttonForSelect[1].innerHTML = "NO"
        ulBulletsList.style.display = 'block';
        showBullets = "yes";
    }
} else {
    showBullets = "yes"
}

// Set Background Switch Button

function switcYesNo(ele) {
    if (ele.classList.contains('background')) {
        if (changeBackground === 'yes') {
            window.localStorage.setItem('chackeBack', changeBackground)
            changeBackground = "no";
            ele.innerHTML = "YES"
            clearInterval(counter);
        } else if (changeBackground === 'no') {
            window.localStorage.setItem('chackeBack', changeBackground)
            changeBackground = "yes"
            ele.innerHTML = "NO";
            counterFun()
            window.localStorage.setItem('chackeBack', "no")
        }
        ele.classList.toggle('active');
        // Set Bullets Opition Button
    } else if (ele.classList.contains('showBullets')) {
        if (showBullets === 'yes') {
            window.localStorage.setItem('chackeBullets', showBullets)
            ulBulletsList.style.display = 'none';
            showBullets = 'no';
            ele.innerHTML = 'YES';
        } else if (showBullets === 'no') {
            window.localStorage.setItem('chackeBullets', "no")
            ulBulletsList.style.display = 'block';
            showBullets = 'yes'
            ele.innerHTML = 'NO';
        }
        ele.classList.toggle('active');
    }
}

// Set Bullets opitionas

bulletOpition()

function bulletOpition() {
    let bullets = document.querySelectorAll('.bullets');
    for (let i = 0; i < bullets.length; i++) {
        let bullet = document.createElement('li');
        bullet.dataset.qq = bullets[i].dataset.bullet;
        bullet.innerHTML = bullets[i].dataset.bullet;
        ulBulletsList.appendChild(bullet);
    }
    document.body.appendChild(ulBulletsList);

}
let bullets = document.querySelectorAll('.ulBulletList li');

// loop on Bullets And Links

function bulletAndLink(elements) {
    elements.forEach((ele) => {
        ele.addEventListener("click", (e) => {
            let eleNewName = ele.innerHTML.toLowerCase();
            e.preventDefault();
            scroll({
                top: document.querySelector('.' + eleNewName).offsetTop,
                behavior: "smooth"
            })
        })
    })
}

bulletAndLink(bullets);
bulletAndLink(links);

// 

//Reset Setting-Box //reset localStorage 
function resetLocal() {
    localStorage.clear();
    window.location.reload()
}

//Skills Progress

let skills = document.querySelector('.skills'),
    frontProgress = document.querySelectorAll('.front-progress');

window.onscroll = () => {
    frontProgress.forEach((progres) => {
        if (window.scrollY >= progres.offsetTop - 570) {
            progres.style.width = `${progres.dataset.width}`
            progres.innerHTML = `${progres.dataset.width}`
        } else {
            progres.style.width = `0%`;
        }
        // Bullets List Open
        if (window.scrollY >= 500) {
            ulBulletsList.style.marginRight = '0px'
        } else {
            ulBulletsList.style.marginRight = '-110px'
        }
    })
}

// End Skills


// Start Gallery
let gallery = document.querySelector('.gallery-parent'),
    galleryImgs = document.querySelectorAll('.gallery-parent .gallery-images img'),
    bigImg = document.querySelector('.gallery-parent .bigImg');

// loop in imgs
galleryImgs.forEach((img) => {
        img.onclick = function(x) {
            // remove All Item From BigImg
            bigImg.innerHTML = '';
            // create Items 
            let newImg = document.createElement('img'),
                titleImg = document.createElement('p'),
                closeImg = document.createElement('span');
            newImg.src = img.dataset.url;
            bigImg.classList.add('pop-img');
            // Set img Position
            bigImg.style.top = img.offsetTop + 100 + "px";
            titleImg.innerHTML = img.alt
            closeImg.className = 'close';
            // append Items To BigImg
            bigImg.appendChild(closeImg);
            bigImg.appendChild(titleImg);
            bigImg.appendChild(newImg);
            // Append Big
            gallery.appendChild(bigImg);
            console.log(img.offsetTop)
        }
    })
    // End Gallery

// clear BigImg Item
document.addEventListener('click', (e) => {
    if (e.target.classList.contains('close')) {
        e.target.parentNode.remove()
    }
})

// End Gallery