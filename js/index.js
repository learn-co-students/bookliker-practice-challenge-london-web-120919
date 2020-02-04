document.addEventListener("DOMContentLoaded", function() {

    const booksUrl = "http://localhost:3000/books/"

    const bookList = document.getElementById('list');
    const showPanelDiv = document.getElementById('show-panel');

    function fetchBooks() {
        fetch(booksUrl)
            .then(response => response.json())
            .then(showBooks)
    }

    function showBooks(json) {
        json.forEach (book => renderBook(book))
    }

    function renderBook(book) {
        console.log(book)
        let li = document.createElement('li')
        li.innerHTML = `<a href="#${book.id}">${book.title}</a>`

        bookList.append(li);

        let div = document.createElement('div')
        let h2 = document.createElement('h2')
        let p = document.createElement('p')
        let img = document.createElement('img')
        let button = document.createElement('button')
        let ul = document.createElement('ul') ///universal var to access on userLikes
        
        h2.innerText = book.title
        h2.id = book.id

        img.src = book.img_url

        p.innerText = book.description

        button.innerText = "Like"

        ul.className = "books-users-likes"
    
        div.append(h2,img,p,ul, button)
        showPanelDiv.append(div);

        /// show a list of people who liked it
        // userLikes(book.users);

 

    }

    function userLikes(users) {
        users.forEach (user => {  

            // let liLikes = document.createElement('li');
            // liLikes.innerText = user.username;
            // ul.append(liLikes);
            });
    
    }
  



    fetchBooks()
});
