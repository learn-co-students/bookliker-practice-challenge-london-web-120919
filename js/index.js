// You will be using the following backend to get the list of books. The expectation here is that you will include the following features

// Be able to click on a book, you should see the book's thumbnail and description and a list of users who have liked the book.
// You can like a book by clicking on a button. You are user 1 {"id":1, "username":"pouros"}, 
// so to like a book send a PATCH request to http://localhost:3000/books/:id with an array of users who like the book. 
// This array should be equal to the existing array of users that like the book, plus your user. 
// For example, if the previous array was "[{"id":2, "username":"auer"}, {"id":8, "username":"goodwin"}],
// you should send as the body of your PATCH request:
const urlBooks = "http://localhost:3000/books"
const urlUsers = "http://localhost:3000/users"
const urlLike = "http://localhost:3000/books/"


document.addEventListener("DOMContentLoaded", function() {
// Get a list of books & render them http://localhost:3000/books

// FETCHING ALL BOOKS

    fetch(urlBooks)
    .then(function(response){
        return response.json()
    })
    .then(function(books){
        renderBooks(books)
    })

// RENDER ALL BOOKS
 function renderBooks(books){
     for (let i = 0; i < books.length; i++) {
        renderBook(books[i])    
     }

 }
    
// RENDER ONE BOOK

 function renderBook(book){
     // CREATING HTML TAGS AND ADDING TEXT
    const div = document.querySelector("#list-panel")
    const ulList = document.querySelector("#list")
    const tit = document.createElement("h2")
    tit.innerText = book.title
    const pTag = document.createElement("p")
    pTag.innerText = book.description
    const imgTag = document.createElement("img")
    imgTag.src = book.img_url
    const ulUsers = document.createElement("ul")
    const likeButton = document.createElement("button")
    likeButton.innerText = "Like"
    // LOOPING ALL USERS THAT LIKES THE BOOK
    for (let i = 0; i < book.users.length; i++) {
        const liUser = document.createElement("li")
        liUser.innerText = book.users[i].username
        ulUsers.append(liUser)
    }
    // APPENDING ALL TAGS
    ulList.append(tit, pTag, imgTag, ulUsers, likeButton)
    // EVENT LISTENER FOR LIKE BUTTON
    likeButton.addEventListener("click", function(e){
        e.preventDefault()
        fetch(urlUsers)
    .then(function(response){
        return response.json()
    }).then(function(users){
        const user = users[0]
        const bookUsers = book.users      
    bookUsers.push(user)
    const configurationObject = {
        method: "PATCH",
        headers: {
            "Content-Type":"application/json",
            "Accept":"application/json"
       },
       body: JSON.stringify({
           users: bookUsers
       })
    }
    return fetch(urlLike + book.id, configurationObject)
    .then(function(response){
     return response.json()
    })
    .then(function(data){
        const li = document.createElement("li")
        li.innerText = data.users[data.users.length -1].username
        ulList.append(li)
    })
   })

    })
 }

 function fetchBookUsers(book){
    
    
    
 }


 function fetchUsers(book, user){
    
}


 renderBooks()

        
});     // END OF EVENT LISTENER
