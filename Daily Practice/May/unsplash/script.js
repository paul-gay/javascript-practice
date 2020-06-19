const formTag = document.querySelector("form");
const inputTag = document.querySelector("input");
const resultsTag = document.querySelector("section.results");

const accessKey = "gP_b0U9qSWoGykdRF-yOvLWuN3Kxzf29U-z56FCS-Jo";
const apiUrl = "https://api.unsplash.com/search/photos?per_page=24&query=blue";

const searchUnsplash = function(term) {
    return fetch(apiUrl, {
        method: "GET", 
        headers: {
            "Authorization": "Client-ID " + accessKey
        }
    })
    .then(response => response.json())
    .then(data => {
        // console.log(data)
        //// format unplash results to suit our needs ////
        // return results object and turn each returned object into new object using map
        // since we only need some of the infor from returned data
        return data.results.map(result => {
            // data.results returns an array of objects
            // return objects into new objects that you have control over 
            return {
                imageSrc: result.urls.regular
            }

        })
    })
};

// take results and add to page
const addResults = function(results) {
    // go over each results and add section tag
    // 1. remove all loading tags
    resultsTag.innerHTML = "";

    // loop other each result and add to results tag
    results.forEach(result => {
        // get current resultsTag and add 
        resultsTag.innerHTML = results.innerHTML + `
            <div class="single-result">
                testing 123
            </div>
        `
    })
}



// get info from input when user submits form
formTag.addEventListener("submit", function(e) {
    // get input info -- by gettings it value (what user types in)
    const searchedTerm = inputTag.value

    // once searched unsplash -- take results and add to page
    searchUnsplash(searchedTerm)
        .then(results => {
            addResults(results);
        })
    
    // form submission by default takes to next page -- prevent default
    e.preventDefault();
})