// // add event listener to each tab
// // grab each tab from document
const tabs = Array.from(document.querySelectorAll('.tab'))
const tabby = document.querySelector('.tabby')
const tabList = document.querySelector('.tabs')
const tabContents = Array.from(tabby.querySelectorAll('.tab-content'))
// // for each tab in tabs array -- add an event listener
// // forEach method used to loop through every item in array
// // forEach syntax:
// /*
// array.forEach(currentValue => {
//    Your statement here
// })
// */
// tabs.forEach(tab => {
//     tab.addEventListener('click', event => {
//         // find the tab they clicked
//         // console.log(tab)

//         // find the corresponding content to clicked tab
//         // find by using designating target element -- 
//         // setting attributes (data-target) of tab to same as id of tab content
//         // added data-target = "content-" to HTML
//         // added id = "content-" to css
//         // when user clicks .tab -- get the target from data-target
//         const target = tab.dataset.target
//         // # is used to grad id from content + the data target from tabs
//         // # + target -- #content-1
//         const tabContent = tabby.querySelector('#' + target)
//         // console.log(target)
//         console.log(tabContent)


//     // selecting a tab:
//     // 1. remove 'is-selected' from other tabs to de-emphasize them
//     // 2. add 'is-selected' to clicked tab to emphasize
    
//     // to remove
//     // t is used instead of tab to avoid overwriting the tab variable above
//     tabs.forEach(t => t.classList.remove('is-selected'))
//     tab.classList.add('is-selected')

//     // select tab content
//     tabContents.forEach(c => c.classList.remove('is-selected'))
//     tabContent.classList.add('is-selected')
    
//     })
// })



/*
above we listened for click event on every tab
when you see that kind of pattern -- use event delegation
by attaching one event listener to the closest common ancestor
in this case that would be: .tabs
since it is the closest common ancestor to each button with class .tab
*/
tabList.addEventListener('click', event => {
    // Find the clicked tab
    const tab = event.target
    // console.log(tab)

    // Find the corresponding tab content
    // through data-target attritute set in HTML
    const target = tab.dataset.target
    const tabContent = tabby.querySelector('#' + target)

    // Remove is-selected from other tabs to de-emphasize them
    // Add is-selected to the clicked tab to emphasize it
    tabs.forEach(t => t.classList.remove('is-selected'))
    tab.classList.add('is-selected')

    // Remove is-selected from other tab content to hide them
    // Add is-selected to the corresponding tab-content to show it
    tabContents.forEach(c => c.classList.remove('is-selected'))
    tabContent.classList.add('is-selected')
})
