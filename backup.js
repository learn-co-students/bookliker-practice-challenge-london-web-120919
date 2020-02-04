document.addEventListener("DOMContentLoaded", function () {

    const baseURL = "http://localhost:3000/books"

    function fetchBooks() {
        fetch(baseURL)
            .then(resp => resp.json())
            .then(showBooks)
    }

    const showPanelDiv = document.querySelector("#show-panel")

    function showBooks(json) {
        json.forEach(book => renderBook(book))
    }

    function renderBook(book) {
        const ulBook = document.querySelector("#list")
        const liBook = document.createElement('li')

        // ctl cmd spc
        liBook.innerHTML = `<a href="#${book.id}">📕${book.title}</a>`

        
        ulBook.appendChild(liBook)

        let div = document.createElement('div')
        const h2 = document.createElement('h2')
        h2.innerText = book.title
        h2.id = book.id
        const pBook = document.createElement('p')
        pBook.innerText = book.description

        const likeBtn = document.createElement('button')
        likeBtn.innerText +=  `${e.users.length}`

        likeBtn.addEventListener('click', function (e) {
            book.users.push({ "id": 1, "username": "pouros" })
            console.log(book.users)

        })


        const ulOfUser = document.createElement('ul')

        const image = document.createElement('img')
        image.src = book.img_url


        div.append(h2, image, pBook, ulOfUser, likeBtn)
        div.style.display = "none";  //hide

        showPanelDiv.appendChild(div)


        book.users.forEach(user => {
            liLike = document.createElement('li')
            liLike.innerText = user.username
            ulOfUser.appendChild(liLike)
        })


    }





    fetchBooks()
});

