const inputField = document.getElementById('searchInput');
const Btn = document.getElementById('submit');
const contentContainer = document.getElementById('content-container');
const content = document.getElementById('content');
const contentLoader = document.getElementById('content-loader');

let input_value;

let h3 = document.createElement('h3');

Btn.addEventListener('click', (e)=>{
    e.preventDefault();

    input_value = inputField.value;

    fetchData(input_value)

})

async function fetchData(searchdata){
    let trimsearchdata = searchdata.trim();
    let cleansearchdata = trimsearchdata.replaceAll(" ", "+");
    h3.classList.add ('text-orange-500', 'font-bold', 'p-4');
    content.innerHTML = " ";
    h3.innerText = 'loading books...'

    contentLoader.appendChild(h3);
    url = 'https://openlibrary.org/search.json'

    url +='?q=';
    url += cleansearchdata;

    try {
        const response = await fetch(url, {
            method: 'GET'
        });

        if(!response.ok){
            console.error('Error Fetching data...');
            return
        }

        let data = await response.json();
        console.log('Reponse was successfull '+ data);

        displaySearch(data, searchdata);
    } catch (error) {
        console.log(error)
    }

}

function displaySearch(data, searchdata){
    const entries = Object.entries(data);
    let books = entries[7][1];

    console.log(books)

    contentLoader.removeChild(h3);

    let found =false;

    for (let i = 0; i < books.length; i++) {
        
        const book = books[i];

        if(book.title && book.title.toLowerCase().includes(searchdata.toLowerCase())){
            found = true;

            let div = document.createElement('div');
            let book_title = document.createElement('h4')
            let authorname = document.createElement('p');
            let ebook_access = document.createElement('p');
            let rdBtn = document.createElement('button');

            div.classList.add("p-2", "border" ,"border-black", "rounded-md", "m-2", "w-[300px]")
            book_title.classList.add("font-bold", "text-lg", "p-2")
            rdBtn.innerText = "Read Book";
            rdBtn.classList.add("p-2", "bg-blue-900", "rounded-md", "m-auto", "text-white")


            book_title.innerText = book.title
            authorname.innerText = `Author: ${book.author_name}`
            ebook_access.innerText = `ebookAcess: ${book.ebook_access}`
            
            div.append(book_title, authorname,ebook_access, rdBtn);
            content.appendChild(div);
        }
    }

    if(!found){
        let h2 = document.createElement('h2');
        h2.classList.add ('text-red-500', 'font-bold', 'p-4');
        h2.innerText = "Book was not Found"
        content.appendChild(h2);
        return
    }
       
}

$(document).ready( function (){

})