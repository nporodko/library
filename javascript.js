const addButton = document.getElementById('addBtn')
const addBook = document.getElementById("addBook")
const btnLogIn = document.getElementById('logInBtn')
const modal = document.getElementById('id01')
const author = document.getElementById('author')
const title = document.getElementById('title')
const pages = document.getElementById('pages')
const isRead = document.getElementById('isYouReadIt')
const form = document.getElementById('addBookForm')
const containerLibrary = document.getElementById('library')

// login part

btnLogIn.addEventListener('click', () => modal.style.display = 'block')

let library = [];

function Book(author, title, pages, isRead) {
  this.author = author
  this.title = title
  this.pages = pages
  this.isRead = isRead
}

function addBookToLibrary() {
const inputAuthor = author.value;
const inputTitle = title.value;
const inputPages = pages.value;
const inputIsRead = isRead.checked
 library.push(new Book(inputAuthor, inputTitle, inputPages, inputIsRead))
}

addButton.addEventListener('click', () => {
    form.classList.toggle('hidden')
})

function validateMyForm() {
  addBookToLibrary();
  renderLibrary();
  form.classList.toggle('hidden')
  
  author.value = '';
  title.value = '';
  pages.value = '';
  isRead.checked = false
}

function renderLibrary() {
  containerLibrary.innerHTML = '';

  for(let i = 0; i < library.length; i++) {
    const book = library[i];

    const bookDiv = document.createElement('div');
    bookDiv.classList.add('book')

     const authorDiv = document.createElement('div')
     authorDiv.classList.add('author')
     const authorText = document.createTextNode(book.author)
     authorDiv.appendChild(authorText)
    
     const titleDiv = document.createElement('div')
      titleDiv.classList.add('title')
     const titleText = document.createTextNode(book.title)
     titleDiv.appendChild(titleText)

     const pagesDiv = document.createElement('div')
     pagesDiv.classList.add('pages')
     const pagesText = document.createTextNode(book.pages)
     pagesDiv.appendChild(pagesText)

     const isReadBtn = document.createElement('button')
     isReadBtn.classList.add('isRead')
     const isReadText = document.createTextNode('Read')
     isReadBtn.appendChild(isReadText)

     const removeBtn = document.createElement('button')
     removeBtn.classList.add('remove')
     removeBtn.appendChild(document.createTextNode('remove'))

     removeBtn.addEventListener('click', () => {
        library.splice(i, 1)
        renderLibrary();
     })

         if(book.isRead === true) {
          isReadBtn.classList.add('green')
          isReadBtn.textContent = 'read'
         } 
         else {
         isReadBtn.classList.add('red')
         isReadBtn.textContent = 'not read'
         }

         isReadBtn.addEventListener('click', () => {
          if(book.isRead === true) {
            isReadBtn.classList.remove('green')
            isReadBtn.classList.add('red')
            book.isRead = false
            isReadBtn.textContent = 'not read'
           } 
           else {
           isReadBtn.classList.remove('red')
           isReadBtn.classList.add('green')
           book.isRead = true
           isReadBtn.textContent = 'read'
           }    
         })
     
     containerLibrary.appendChild(bookDiv)
     bookDiv.appendChild(authorDiv)
     bookDiv.appendChild(titleDiv)
     bookDiv.appendChild(pagesDiv)
     bookDiv.appendChild(isReadBtn)
     bookDiv.appendChild(removeBtn)
  }
}



