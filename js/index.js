const saerchField=document.getElementById('search-field')
const bookContainer=document.getElementById('book-container')
const spinner=document.getElementById('spinner')
const total=document.getElementById('total')


const getAllData=async()=>{
    bookContainer.innerHTML=''
    let searchText=saerchField.value
    spinner.classList.remove('d-none')
    const url=`http://openlibrary.org/search.json?q=${searchText}`
    const res= await fetch(url)
    const data =await res.json()
    spinner.classList.add('d-none')
    saerchField.value=''
    displayBook(data.docs)
    
    
   
}

const displayBook=(books)=>{
console.log(books.length)
console.log(books)
const newArray=books.slice(11,30)
total.innerText=`The number of books : ${newArray.length}`
newArray.forEach(book => {
    console.log(book)
    const{title,author_name,first_publish_year}=book
    // console.log(title)
    const bookDiv=document.createElement('div')
    bookDiv.classList.add('col-lg-4')
    
    bookDiv.innerHTML=`
    <div class="card h-100">
    <div class="card-body">
      <h5 class="card-title">${title}</h5>
      <h6>${author_name}</h6>
      <h6>${first_publish_year}</h6>
      
      <p class="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
    </div>
  </div>`
  bookContainer.appendChild(bookDiv)

});

}