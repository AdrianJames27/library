const modalAdd = document.getElementById('modalAdd');
const btnAdd = document.getElementById('btnAdd');
const closeAdd = document.getElementById('closeAdd');

const formAddBook = document.getElementById('formAddBook');
const txtBookTitle = document.getElementById('txtBookTitle');
const txtBookAuthor = document.getElementById('txtBookAuthor');
const txtIsbn = document.getElementById('txtIsbn');

closeAdd.addEventListener('click', () => {
    modalAdd.close();
});

btnAdd.addEventListener('click', () => {
    modalAdd.showModal();
});

formAddBook.addEventListener('submit', async (e) => {
    const currUser = JSON.parse(sessionStorage.getItem('currUser'));

    e.preventDefault();

    const book = {
        bookTitle: txtBookTitle.value,
        bookAuthor: txtBookAuthor.value,
        isbn: txtIsbn.value,
        userId: currUser.userId
    };

    if (book.bookTitle !== "" && book.bookAuthor !== "" && book.isbn !== "") {
        try {
            const response = await fetch('addBook.php', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(book)
            });

            if (!response.ok) {
                throw new Error('Response Error');
            }

            tblValues.innerHTML = null;
            await displayBook();
        } catch (error) {
            console.error("Error" + error);
        }
    }

    formAddBook.reset();
    modalAdd.close();
});
