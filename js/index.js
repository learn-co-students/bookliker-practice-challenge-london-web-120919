document.addEventListener('DOMContentLoaded', function() {
	const url = 'http://localhost:3000/books/';

	function fetchBooks() {
		fetch(url).then(function(resp) {
			return resp.json().then(function(books) {
				showBooks(books);
			});
		});
	}

	function showBooks(json) {
		showPanelDiv.innerHTML = '';
		ulBooks.innerHTML = '';
		json.forEach(book => {
			renderBook(book);
		});
	}

	const showPanelDiv = document.querySelector('#show-panel');
	const ulBooks = document.querySelector('#list');

	function renderBook(book) {
		
		const liBook = document.createElement('li');

		liBook.innerHTML = `<a href="#${book.id}">📚${book.title}</a>`;
		ulBooks.appendChild(liBook);

		const div = document.createElement('div');
		const h2 = document.createElement('h2');
		h2.innerText = book.title;
		h2.id = book.id;

		const pBook = document.createElement('p');
		pBook.innerText = book.description;

		const image = document.createElement('img');
		image.src = book.img_url;

		const likeBtn = document.createElement('button');
		let totalLikes = book.users.length;
		likeBtn.innerText = 'Total Likes ' + totalLikes;

		const userLiked = document.createElement('ul');
		for (let i = 0; i < book.users.length; i++) {
			const liUserLike = document.createElement('li');
			liUserLike.innerText = book.users[i].username;
			userLiked.append(liUserLike);
		}

		likeBtn.addEventListener('click', function(e) {
			likeBtn.innerText = 'Total Likes ' + (totalLikes + 1);

			let newLikeUsers = [...book.users, { id: 1, username: 'pouros' }];

			fetch('http://localhost:3000/books/' + book.id, {
				method: 'PATCH',
				headers: {
					'Content-Type': 'application/json',
					Accept: 'application/json'
				},

				body: JSON.stringify({
					users: newLikeUsers
				})
			}).then(fetchBooks);
		});

		div.append(h2, image, pBook, likeBtn, userLiked);
		showPanelDiv.appendChild(div);
	}

	fetchBooks();
});
