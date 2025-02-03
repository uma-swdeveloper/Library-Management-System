document.getElementById('addBookForm').addEventListener('submit', function (event) {
    event.preventDefault();

    const title = document.getElementById('title').value;
    const author = document.getElementById('author').value;
    const status = document.getElementById('status').value;

    const formData = new FormData();
    formData.append('title', title);
    formData.append('author', author);
    formData.append('status', status);

    fetch('/add_book', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        const tableBody = document.querySelector('#booksTable tbody');
        const newRow = document.createElement('tr');
        newRow.setAttribute('data-id', data.id);
        newRow.innerHTML = `
            <td>${data.title}</td>
            <td>${data.author}</td>
            <td>${data.status}</td>
            <td>
                <button class="update-btn">Update Status</button>
                <button class="delete-btn">Delete</button>
            </td>
        `;
        tableBody.appendChild(newRow);
    });

    document.getElementById('title').value = '';
    document.getElementById('author').value = '';
});

document.querySelector('#booksTable').addEventListener('click', function (event) {
    const row = event.target.closest('tr');
    const bookId = row.getAttribute('data-id');

    if (event.target.classList.contains('delete-btn')) {
        const formData = new FormData();
        formData.append('id', bookId);

        fetch('/delete_book', {
            method: 'POST',
            body: formData
        })
        .then(response => response.json())
        .then(data => row.remove());
    }

    if (event.target.classList.contains('update-btn')) {
        const newStatus = prompt("Enter new status (Available / Checked Out):");
        if (newStatus) {
            const formData = new FormData();
            formData.append('id', bookId);
            formData.append('status', newStatus);

            fetch('/update_book', {
                method: 'POST',
                body: formData
            })
            .then(response => response.json())
            .then(data => {
                row.cells[2].innerText = newStatus;
            });
        }
    }
});
