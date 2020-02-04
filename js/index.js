const booksURL = "http://localhost:3000/books/"

function makeElement(type) {
    return document.createElement(type)
}

document.addEventListener("DOMContentLoaded", function() {

    
    const list = document.querySelector("#list")
    const showDiv = document.querySelector("#show-panel")

    
    function fetchBooks(url) {
        fetch(url)
            .then( response => response.json())
            .then( books => renderBooks(books) )
    }

    function renderBooks(books) {
        for(const book of books) {
            createBookLI(book)
        }
    }

    function createBookLI (book) {
        const { title} = book
        newBook = makeElement("li")
        newBook.innerText = title
        showBook(newBook, book)

        list.append(newBook)
    }

    function showBook(newBook, book){
        newBook.addEventListener("click", function(){
            showDiv.innerHTML = ''
            createBookDiv(book)
        })
    }

    function createBookDiv(book) {
        const { id, title, description, img_url, users } = book
        let bookTitle = makeElement("h2")
        bookTitle.innerText = title
        let bookPic = makeElement("img")
        bookPic.src = img_url
        let bookDesc = makeElement("p")
        bookDesc.innerText = description
        let likeBookButton = makeElement("button")
        likeBookButton.innerText = "Like this Book"       
        let likedBy = makeElement("h3")
        likedBy.innerText = `Liked by ${users.length} users:`
        let usersUL = makeElement("ul")
        usersUL.id = "UL"
        likedBy.append(appendUsers(users, usersUL))
        showDiv.append(bookTitle, bookPic, bookDesc, likeBookButton, likedBy)
        likeBook(likeBookButton, book) 
    }

    function appendUsers(users, usersUL){
        for(const user of users) {
            li = makeElement("li")
            li.innerText = user.username
            usersUL.append(li)
        }
        return usersUL
    }
    
    function likeBook(button, book) {
        button.addEventListener("click", function(e){
            let id = book.id
            let newUsers = [...book.users, {"id":1, "username":"pouros"}]
            let configObj = {
                method: "PATCH",
                headers: {
                    "content-type": "application/json",
                    "accept": "application/json"
                },
                body: JSON.stringify({
                    "users": newUsers
                  })
            }
            fetch(booksURL + id, configObj)
                .then( response => response.json())
                .then( book => {
                    showDiv.innerHTML = ''
                    createBookDiv(book)
                })
            
        })
    }

    fetchBooks(booksURL)

});
