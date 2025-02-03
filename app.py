from flask import Flask, render_template, request, jsonify

app = Flask(__name__)

# Dummy data for the library books
books = [
    {"id": 1, "title": "Harry Potter", "author": "J.K. Rowling", "status": "Available"},
    {"id": 2, "title": "The Hobbit", "author": "J.R.R. Tolkien", "status": "Checked Out"},
    {"id": 3, "title": "1984", "author": "George Orwell", "status": "Available"}
]

@app.route('/')
def home():
    return render_template('index.html', books=books)

@app.route('/add_book', methods=['POST'])
def add_book():
    title = request.form['title']
    author = request.form['author']
    status = request.form['status']
    
    new_book = {"id": len(books) + 1, "title": title, "author": author, "status": status}
    books.append(new_book)
    
    return jsonify(new_book)

@app.route('/update_book', methods=['POST'])
def update_book():
    book_id = int(request.form['id'])
    status = request.form['status']
    
    for book in books:
        if book['id'] == book_id:
            book['status'] = status
            break
    
    return jsonify({"status": "success"})

@app.route('/delete_book', methods=['POST'])
def delete_book():
    book_id = int(request.form['id'])
    
    global books
    books = [book for book in books if book['id'] != book_id]
    
    return jsonify({"status": "success"})

if __name__ == '__main__':
    app.run(debug=True)
