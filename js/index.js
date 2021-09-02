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
    if (searchText.length===0) {
      handleWarning('show')
    }
    // data load
   else{
    handleSpinner('show')
    const url=`https://openlibrary.org/search.json?q=${searchText}`
    const res= await fetch(url)
    const data =await res.json()
    handleSpinner()
    saerchField.value=''
    displayBook(data.docs)
    handleWarning()
   }
  }
// display books on ui
const displayBook=(books)=>{
  // create book card and show on ui
if (books.length>0) {
  handleSecondWarning()
  const shortBooksList=books.slice(0,30)
total.innerText=`The number of books : ${books.length}`
shortBooksList.forEach(book => {
    const{title,author_name,first_publish_year,cover_i,publisher}=book
    const bookDiv=document.createElement('div')
    bookDiv.classList.add('col')
    bookDiv.innerHTML=`
    <div class="card h-100">
    <img src="https://covers.openlibrary.org/b/id/${cover_i}-M.jpg" class="card-img-top" alt="...">
    <div class="card-body">
      <h4 class="card-title">${title}</h4>
      <h6>Author: ${author_name?.[0]??'unknown'}</h6>
      <h6>Published Year : ${first_publish_year??'unknown'}</h6>
      <h6>Publisher: ${publisher?.[0]??'unknown'}</h6>
    </div>
    
  </div>
  </div>`
  bookContainer.appendChild(bookDiv)

});
}
else{
  handleSecondWarning('show')
}

}
// handle spinner
const handleSpinner=(method)=>{
  if (method==='show') {
    spinner.classList.remove('d-none')
    warning.classList.add('d-none')
  }else{
    spinner.classList.add('d-none')
    
  }
}
// handle empty search input
const handleWarning=(method)=>{
  if (method==='show') {
    warning.classList.remove('d-none')
    warning2.classList.add('d-none')
  }else{
    warning.classList.add('d-none')
  }
}
// handle invalid book name
const handleSecondWarning=(method)=>{
  if (method==='show') {
    warning2.classList.remove('d-none')
    warning.classList.add('d-none')
    }else{
    warning2.classList.add('d-none')
  }
}
