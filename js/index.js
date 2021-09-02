// taking  all needed element using id 
const saerchField=document.getElementById('search-field')
const bookContainer=document.getElementById('book-container')
const spinner=document.getElementById('spinner')
const total=document.getElementById('total')
const warning=document.getElementById('warning')
const warning2=document.getElementById('warning2')

// get all data from api
const getAllData=async()=>{
  total.innerText=''
    bookContainer.innerHTML=''
    let searchText=saerchField.value
    // empty input value handling
    if (searchText.length===0) {
      warning.classList.remove('d-none')
    }
    // data load
   else{
    spinner.classList.remove('d-none')
    const url=`https://openlibrary.org/search.json?q=${searchText}`
    const res= await fetch(url)
    const data =await res.json()
    spinner.classList.add('d-none')
    saerchField.value=''
    displayBook(data.docs)
    console.log(data.docs)
    warning.classList.add('d-none')
   }
  }
// display books on ui
const displayBook=(books)=>{
  // create book card and show on ui
if (books.length>0) {
  warning2.classList.add('d-none')
  const shortBooksList=books.slice(0,20)
total.innerText=`The number of books : ${shortBooksList.length}`
shortBooksList.forEach(book => {
    const{title,author_name,first_publish_year,cover_i,publisher}=book
    const bookDiv=document.createElement('div')
    bookDiv.classList.add('col')
    bookDiv.innerHTML=`
    <div class="card h-75">
    <img src="https://covers.openlibrary.org/b/id/${cover_i}-M.jpg" class="card-img-top h-50" alt="...">
    <div class="card-body">
      <h5 class="card-title">${title}</h5>
      <h6>Author:${author_name?.[0]??'unknown'}</h6>
      <h6>Published Year :${first_publish_year??'unknown'}</h6>
      <h6>Publisher:${publisher?.[0]??'unknown'}</h6>
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



