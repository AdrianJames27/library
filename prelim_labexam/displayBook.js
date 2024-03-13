const tblValues = document.getElementById('tblValues');

async function displayBook() {
    try {
        const currUser = JSON.parse(sessionStorage.getItem('currUser'));

        const response = await fetch('getBooks.php', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(currUser)
        });

        if (!response.ok) {
            throw new Error('Response Error');
        }

        const data = await response.json();

        data.forEach(item => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${item.bookTitle}</td>
                <td>${item.bookAuthor}</td>
                <td>${item.isbn}</td>
            `;

            tblValues.appendChild(tr);
        });
    } catch (error) {
        console.error("Error" + error);
    }
}


const txtSearch = document.getElementById('txtSearch');

txtSearch.onkeyup = async function() {
    try {
        const currUser = JSON.parse(sessionStorage.getItem('currUser'));

        const datas = {
            userId: currUser.userId,
            title: txtSearch.value
        };

        const response = await fetch('getBookTitle.php', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(datas)
        });

        if (!response.ok) {
            throw new Error('Response Error');
        }

        const data = await response.json();

        tblValues.innerHTML = null;
        
        if (String(data) !== 'null') {
            data.forEach(item => {
                const tr = document.createElement('tr');
                tr.innerHTML = `
                    <td>${item.bookTitle}</td>
                    <td>${item.bookAuthor}</td>
                    <td>${item.isbn}</td>
                `;

                tblValues.appendChild(tr);
            });
        } else {
            await displayBook();
        }
    } catch (error) {
        console.error("Error" + error);
    }
}