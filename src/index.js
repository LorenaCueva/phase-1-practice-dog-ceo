// console.log('%c HI', 'color: firebrick')
document.addEventListener('DOMContentLoaded', () => {

fetchImages()
fetchBreeds()
fillDropDown()
})

function fetchImages(){
    fetch("https://dog.ceo/api/breeds/image/random/4")
    .then(response => response.json())
    .then(images => addImages(images.message))
}

function fetchBreeds(){
    fetch("https://dog.ceo/api/breeds/list/all")
    .then(response => response.json())
    .then(breeds => { allBreeds = Object.keys(breeds.message)
        addBreeds(allBreeds)
        filterBreeds(allBreeds)
    })
}

function addImages(images){
    const container = document.getElementById('dog-image-container')
    images.forEach(img => {
        const newImg = document.createElement('img')
        newImg.src = img
        container.appendChild(newImg)
    })
}

function addBreeds(breeds){
    const list = document.getElementById('dog-breeds')
    list.innerHTML = ""
    breeds.forEach(breed => {
        const newBreed = document.createElement('li')
        newBreed.innerText = breed
        newBreed.addEventListener('click', changeColor)
        list.appendChild(newBreed)
    })
}

function fillDropDown(){
    const container = document.getElementById('breed-dropdown')
    for(let i = 0; i < 26; i++){
        let letter = String.fromCharCode(97 + i)
        const option = document.createElement('option')
        option.value = letter
        option.innerText = letter
        container.appendChild(option)

    }
}

function filterBreeds(breeds){
    const select = document.getElementById('breed-dropdown')
    select.addEventListener('change', e => { 
           if(e.target.value === 'all'){
               addBreeds(breeds)
           }
           else{
            const newBreeds = breeds.filter(el => el.startsWith(e.target.value))
            addBreeds(newBreeds)
           } 
     })
}

function changeColor(e){
    e.target.style.color = getRandomColor()
}

function getRandomColor() {
    return `rgb(${Math.floor(Math.random() *256)}, ${Math.floor(Math.random() *256)}, ${Math.floor(Math.random() *256)})`
}