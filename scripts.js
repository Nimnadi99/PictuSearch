const accessKey = "wBoG3JYzSE2fYNI4RNZOeEiKyrCrGEBYJyobtD1cKAo";
const formSearch = document.querySelector('form');
const inputSearch = document.getElementById('search-input');
const serachResult = document.querySelector('.rowsAdjust');
const showMoreButton = document.getElementById('show-more-button');

let inputData = "";
let page = 1;

// function searchImages(){
//     inputData = inputSeach.value;
//     //fetch data from unsplash and show all data
//     const url = `https://api.unsplash.com/search/photos?page=${page}&query=${inputData}&client_id=${accessKey}`//dynamic varible
//}

//convert function into async function to fetch and response data
async function searchImages(){
    inputData = inputSearch.value;
    //fetch data from unsplash and show all data
    const url = `https://api.unsplash.com/search/photos?page=${page}&query=${inputData}&client_id=${accessKey}`//dynamic varible
    const response = await fetch(url); //fetch all the data
    // data holding all the json data
    const data = await response.json(); //convert fetch data into json format
    //json data convert into images and texts
    const results = data.results; //Inside results have lots of images and lots of data
    if(page === 1){
        serachResult.innerHTML = "";
    }
    //map results variable show images and texts one by one
    results.map((result)=>{
        const imageWrapper = document.createElement('div'); //add div
        imageWrapper.classList.add('rowsAdjust'); // Assign div to classname
        const image = document.createElement('img');  // add image element
        image.src = result.urls.small; //image src to assign url
        image.alt = result.alt_description; // image alt to add description
        const imageLink = document.createElement('a'); //add a element
        imageLink.classList.add('linkImage')
        imageLink.href = result.links.html; // assign a element href attribute to value
        imageLink.target = "_blank"; //assign a element alt attribute to value
        imageLink.textContent = result.alt_description; //assign a elemt text

        //APPEND ELEMENTS TO HTML
        imageWrapper.appendChild(image);
        imageWrapper.appendChild(imageLink);
        serachResult.appendChild(imageWrapper)
    });
    page++;
    if(page>1){
        showMoreButton.style.visibility = 'visible';
    }
}
formSearch.addEventListener('submit',(event)=>{
    event.preventDefault();
    page = 1;
    searchImages();
});
showMoreButton.addEventListener('click',() =>{
    searchImages();
})