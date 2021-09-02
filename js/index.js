const saerchField=document.getElementById('search-field')
const bookContainer=document.getElementById('book-container')
const spinner=document.getElementById('spinner')
const total=document.getElementById('total')
const warning=document.getElementById('warning')
const warning2=document.getElementById('warning2')


const getAllData=async()=>{
  total.innerText=''
    bookContainer.innerHTML=''
    let searchText=saerchField.value
    if (searchText.length===0) {
      warning.classList.remove('d-none')
    }
   else{
    spinner.classList.remove('d-none')
    const url=`https://openlibrary.org/search.json?q=${searchText}`
    const res= await fetch(url)
    const data =await res.json()
    spinner.classList.add('d-none')
    saerchField.value=''
    displayBook(data.docs)
    warning.classList.add('d-none')
   }
  }

const displayBook=(books)=>{
console.log(books)
// console.log(books)
if (books.length>0) {
  warning2.classList.add('d-none')
  const newArray=books.slice(0,20)
total.innerText=`The number of books : ${newArray.length}`
newArray.forEach(book => {
    // console.log(book)
    // const{title,author_name,first_publish_year,cover_i}=book
    // console.log(cover_i)
    const bookDiv=document.createElement('div')
    bookDiv.classList.add('col')
    
    bookDiv.innerHTML=`
    <div class="card h-75">
    <img src="https://covers.openlibrary.org/b/id/${book?.cover_i}-M.jpg" class="card-img-top h-50" alt="...">
    <div class="card-body">
      <h5 class="card-title">${book?.title}</h5>
      <h6>Author:${book?.author_name?.[0]}</h6>
      <h6>Published Year :${book?.first_publish_year}</h6>
      <h6>Publisher:${book?.publisher[0]}</h6>
    </div>
    
  </div>
  </div>`
  bookContainer.appendChild(bookDiv)

});
}
else{
  warning2.classList.remove('d-none')
}

}

console.log('hello')