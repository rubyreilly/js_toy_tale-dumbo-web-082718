
document.addEventListener("DOMContentLoaded", init)

function init(){
  const addBtn = document.querySelector('#new-toy-btn')
  const toyForm = document.querySelector('.container')

  let addToy = false

  getToys()

  addBtn.addEventListener('click', () => {

    // hide & seek with the form
    addToy = !addToy
    if (addToy) {
      toyForm.style.display = 'block'

      toyForm.addEventListener("submit", handleSubmit)
      // submit listener here
    } else {
      toyForm.style.display = 'none'
    }
  })

  }


function getToys(){
  fetch("http://localhost:3000/toys")
  .then(res=>res.json())
  .then(toys=>toys.forEach(toy=>showToy(toy)))
}


function showToy(toy){
  const div = document.createElement('div')

  div.className = 'card'
  div.innerHTML =
    `<h2>${toy.name}</h2>
    <img src=${toy.image} class="toy-avatar"/>
    <p>${toy.likes} Likes </p>
    <button data-id=${toy.id} data-likes=${toy.likes} class="like-btn">Like <3</button>`
  div.addEventListener('click',handleClick)
  const toyCollection = document.querySelector("#toy-collection")
  toyCollection.append(div)
}


function handleClick(event){
  if (event.target.tagName === 'BUTTON'){
    //figure out how many Likes
    //send patch request for one more like
    console.log(event.target.dataset.id)
    const id = event.target.dataset.id
    const likes = parseInt(event.target.dataset.likes)+1
    event.target.dataset.likes = likes
    event.target.parentElement.querySelector('p').innerText = `${likes} Likes`
    updateLikes(id, likes)

  }
}

function updateLikes(id, likes){

  let options = {
    method: "PATCH",
    headers:{
      "Content-Type":"application/json",
      Accept: "application/json"
    },
    body: JSON.stringify({likes:likes})
  }
  fetch(`http://localhost:3000/toys/${id}`, options)

}


function handleSubmit(event){
  event.preventDefault()

  let data = {
    name: event.target.name.value,
    image: event.target.image.value,
    likes: 0
  }

  event.target.name.value = ""
  event.target.image.value = ""

  postToy(data)
}

function postToy(obj){
  const options = {
    method:"POST",
    body:JSON.stringify(obj),
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    }
  }
  return fetch("http://localhost:3000/toys", options)
  .then(res=>res.json())
  .then(toy=>showToy(toy))
}
