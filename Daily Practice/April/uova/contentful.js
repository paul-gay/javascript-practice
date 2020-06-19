const spaceId = "iq8zyd8vxo9c";
const environmentId = "master";
const accessToken = "ZRzMQ86FCQxm1iSKMrz0k4bqnQkiiiW3wcdgloBf3dM";

const url = `https://cdn.contentful.com/spaces/${spaceId}/environments/${environmentId}/entries?access_token=${accessToken}&order=fields.order&content_type=menuItem`;

const sectionTag = document.querySelector("section.grid");

// console.log(url)

const grabData = function() {
  return fetch(url)
  // take data from url and turn response data into json data
  	.then(response => response.json())
  // then do something with that data
  	.then(data => {
      // store our assets somewhere
      const assets = data.includes.Asset;


    	// turn our contentful data into something more useful
    	// use .map method to loop through each item in array of data (similar to forEach)
    	// for each item we want to grab only the information we need -- which is the fields
    	return data.items.map(item => {
        
        // faking our image first in order to have something that we can change with our api content
        let imageUrl = "assets/img/image1.jpg";

        const imageId = item.fields.image.sys.id

        const imageData = assets.find(asset => {
          return asset.sys.id == imageId;
        });

        if (imageData) {
          imageUrl = imageData.fields.file.url;
        }

        item.fields.image = imageUrl;
        
        // returns an object with just the fields data
        return item.fields;
      });
  	});
};

// run grabData function on load
grabData().then(data => {
  // do something with the returned data
  console.log(data);
  
  // remove loader animation
  sectionTag.innerHTML = "";
  
  // loop through each individual item and change the inner HTML
  data.forEach(item => {
    sectionTag.innerHTML = sectionTag.innerHTML + `
        <div class="item">
          <img src="${item.image}">

          <div class="title">
            <h2>${item.title}</h2>
            <p>${item.price}</p>
          </div>

          <p>${item.description}</p>
		
			</div>
		`
  });
});
