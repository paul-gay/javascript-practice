const formTag = document.querySelector("form");
const inputTag = document.querySelector("input");
const resultsTag = document.querySelector("section.results");

const accessKey = "gP_b0U9qSWoGykdRF-yOvLWuN3Kxzf29U-z56FCS-Jo";
const apiUrl = "https://api.unsplash.com/search/photos?per_page=24&query=";

const searchUnsplash = function(term) {
    return fetch(apiUrl + term, {
        method: "GET", 
        headers: {
            "Authorization": "Client-ID " + accessKey
        }
    })
    .then(response => response.json())
    .then(data => {
        return data.results.map(result => {
            return {
                imageSrc: result.urls.regular,
                width: result.width,
                height: result.height,
                title: (result.description || "Untitled"),
                name: result.user.name,
                backgroundColor: (result.color || "#cccccc") + "33"
            }

        });
    });
};

// take results and add to page
const addResults = function(results) {
    // remove all loading tags
    resultsTag.innerHTML = "";

    // loop over each results and add to resultsTag
    results.forEach(result => {
        resultsTag.innerHTML = resultsTag.innerHTML + `
            <div class="single-result"> 
                <div class="image" style="background-color: ${result.backgroundColor}">
                    <img src="${result.imageSrc}"/>
                </div>
                <h2>${result.title}</h2>
                <p>by ${result.name} - ${result.width} x ${result.height}</p>
            </div>
        `
    });
};


// get info from input when user submits form
formTag.addEventListener("submit", function(e) {
    e.preventDefault();

    const searchTerm = inputTag.value;

    searchUnsplash(searchTerm)
        .then(results => {
            addResults(results);
        });
    
});