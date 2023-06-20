import { books, authors, genres, BOOKS_PER_PAGE } from './data.js'


/**
 * This is an object literal that contains all the references to all the HTML elements 
 * that are referenced throught the app either through initialization or while its running 
 * through event listeners. This is to ensure that they are all accessed in a structured manner.
 * 
 */

const html = {
    header: {
        search: document.querySelector('[data-header-search]'),
        settings: document.querySelector('[data-header-settings'),
    },

    list: {
        active: document.querySelector('[data-list-active]'),
        items: document.querySelector('[data-list-items]'),
        message: document.querySelector('[data-list-message]'),
        button: document.querySelector('[data-list-button]'),
        blur: document.querySelector('[data-list-blur]'),
        image: document.querySelector('[data-list-image]'),
        title: document.querySelector('[data-list-title]'),
        subtitle: document.querySelector('[data-list-subtitle]'),
        description: document.querySelector('[data-list-description]'),
        close: document.querySelector('[data-list-close]'),
        
    },

    search: {
        overlay: document.querySelector('[data-search-overlay]'),
        form: document.querySelector('[data-search-form]'),
        title: document.querySelector('[data-search-title]'),
        genres: document.querySelector('[data-search-genres]'),
        authors: document.querySelector('[data-search-authors]'),
        cancel: document.querySelector('[data-search-cancel]'),
    },

    settings: {
        overlay: document.querySelector('[data-settings-overlay]'),
        form: document.querySelector('[data-settings-form]'),
        theme:document.querySelector('[data-settings-theme]'),
        cancel:document.querySelector('[data-settings-cancel]'),

    },
};

let page = 1;
let matches = books

//preview funtion


/**
 * This is a function that allows all the previews that occur in the app. It will allow the user to see a preview of an image that has the book's
 * author, id and title.
 * 
 * It calls author, id , image and title which will be called in the for loop 
 * 
 */

const createPreview = (author, id, image,title ) => {

    
    const fragment = document.createDocumentFragment();

    const preview = ()=> { 
        
        const element = document.createElement('button')
        element.classList = 'preview'
        element.setAttribute('data-preview', id)
       
        element.innerHTML = `
           <img
               class="preview__image"
               src="${image}"
           />
           
           <div class="preview__info">
               <h3 class="preview__title">${title}</h3>
               <div class="preview__author">${authors[author]}</div>
           </div>
        `
        fragment.appendChild(element)
}   

       return{
        fragment,
        preview
       };

       }
const fragment = createPreview().fragment

const preview = createPreview().preview

console.log(createPreview())
    

     
    
    

 //fragment works for all the preview sections
   
//starting preview
/**
 * This for loop allows the preview of the first 36 books when you open the app. It contains the preview function which allows the user to see the books author, id, image
 * and title.
 */
for (const { author, id, image, title } of matches.slice(0, BOOKS_PER_PAGE)) {
    createPreview(author,id, image, title).preview
};
html.list.items.appendChild(fragment)   //uses fragment that was called above

//Show more button function 

/**
 * This function allows the show more button to function everywhere on the app. It will show at the end of the first 36 books to allow the rest of the books to show.
 * It will continue to do so every 36 books at a time. It will also show when you filter search books ,using the search button, to view if there are anymore books according to your filter method.
 */
const showMoreHTML = () => {
   
    html.list.button.innerText = `Show more`
    html.list.button.enabled = (matches.length - (page * BOOKS_PER_PAGE)) > 0

    html.list.button.innerHTML = `
    <span>Show more</span>
    <span class="list__remaining"> (${(matches.length - (page * BOOKS_PER_PAGE)) > 0 ? (matches.length - (page * BOOKS_PER_PAGE)) : 0})</span>
`
}

//Function that creates Author and Genre options in the search button
/**
 * This function allows you to create genre and author options in the app. It was created so that only one function is used instead of two.It contains two parameters
 * optionName and genreOrAuthor that can be substituted. In the case of Authors, it will allow the user to see "All Authors" when  the string "All Authors" in the optionName 
 * and a list of different authors when authors is substituted in the genreOrAuthor param.In the case of genres, it will allow the user to see "All Genres" when  the string "Genres" 
 * is substituted in the optionName param and a list of different genres when authors is substituted in the genreOrAuthor param.
 * @param {string} optionName      
 * @param {object} genreOrAuthor 
 * @returns fragment
 */

const createOptionsHtml = (optionName, genreOrAuthor ) => {
    
    const fragment = document.createDocumentFragment()
    const option = document.createElement('option')      
    option.value = "any"                              
    option.innerText = optionName
    fragment.appendChild(option)        
   
  
  for (const [id, names] of Object.entries(genreOrAuthor)) {
    const element = document.createElement('option')      
    element.value = id                              
    element.innerText = names
    fragment.appendChild(element)                             
  }
  return fragment
};

/**
 * Genre options are created using the createOptionsHtml function which will allow the user to see "All Genres" and a list of genres when the search tab is open.
 * 
 */
const genreOptions = createOptionsHtml("All Genres", genres) 
html.search.genres.appendChild(genreOptions)
            
/**
 * Author options are created using the createOptionsHtml function which will allow the user to see "All Authors" and a list of authors when the search tab is open.
 */
const authorOptions = createOptionsHtml("All Authors", authors) 
html.search.authors.appendChild(authorOptions)

showMoreHTML();

/**
 * The these event listeners allow the search button to function. They allow it to open and close and to be in focus.
 */
const handleSearchToggle = () => {
    html.search.overlay.toggleAttribute('open');
};
html.header.search.addEventListener('click', handleSearchToggle)
html.search.cancel.addEventListener('click', handleSearchToggle)
    
html.search.title.focus()
   
/**
 * These event listeners allow the theme button to open and close. 
 */

const handleThemeSettings = () => {
    html.settings.overlay.toggleAttribute('open') 
}
html.settings.cancel.addEventListener('click', handleThemeSettings)
html.header.settings.addEventListener('click', handleThemeSettings)
 
/**
 * This event listener allows the the data list or list of books to close after you search or open the preview
 */
html.list.close.addEventListener('click', () => {
    html.list.active.open = false
})

/**
 * This event listener allows the day and night theme or mode to function. It allows the user to see the darker mode if night is selected 
 * and a lighter one if day is selected
 * 
 */

html.settings.form.addEventListener('submit', (event) => {
    
    event.preventDefault()
    const formData = new FormData(event.target)
    const { theme } = Object.fromEntries(formData)

    if (theme === 'night') {
        document.documentElement.style.setProperty('--color-dark', '255, 255, 255');
        document.documentElement.style.setProperty('--color-light', '10, 10, 20');
    } else {
        document.documentElement.style.setProperty('--color-dark', '10, 10, 20');
        document.documentElement.style.setProperty('--color-light', '255, 255, 255');
    }
    
    html.settings.overlay.open = false
})

//filter search

/**
 * This event listener allows the user to filter search. It does so by creating an array when each of the conditions of the for loop and if statement are met.
 */
html.search.form.addEventListener('submit', (event) => {
    event.preventDefault()
    const formData = new FormData(event.target)
    const filters = Object.fromEntries(formData)
    const result = []

    for (const book of books) {
        let genreMatch = filters.genre === 'any'

        for (const singleGenre of book.genres) {
            if (genreMatch) break;
            if (singleGenre === filters.genre) { genreMatch = true }
        }

        if (
            (filters.title.trim() === '' || book.title.toLowerCase().includes(filters.title.toLowerCase())) && 
            (filters.author === 'any' || book.author === filters.author) && 
            genreMatch
        ) {
            result.push(book)
        }
    }

page = 1;
matches = result;


//to show error message 

/**
 * Displays an error message according to the array made using the filter search. 
 */
if (result.length < 1) {
    html.list.message.classList.add('list__message_show')
}else {
        html.list.message.classList.remove('list__message_show')
    }
  

//preview here for more books
/**
 * Allows previews of the filter searched books using the preview function.
 */
html.list.items.innerHTML = ''
    
    createPreview(result);
    html.list.items.appendChild(fragment) 
    html.list.button.enabled = (matches.length - (page * BOOKS_PER_PAGE)) < 1


showMoreHTML();

    window.scrollTo({top: 0, behavior: 'smooth'});
    html.search.overlay.open = false
})


/**
 * This event listener allows the user to preview the books after they have been filter searched. It uses the preview function
 */
html.list.button.addEventListener('click', () => {
    
    for (const { author, id, image, title } of matches.slice(page * BOOKS_PER_PAGE, (page + 1) * BOOKS_PER_PAGE)) {
        createPreview(author,id, image, title).preview
    }

    html.list.items.appendChild(fragment)
    page += 1;
    
})


/**
 * This event listener allows the user to get a preview of the book when it is clicked. It will display an image with a blurey background, a title, the author and 
 * a description of the book.
 */

html.list.items.addEventListener('click', (event) => {
    const pathArray = Array.from(event.path || event.composedPath())
    let active = null

    for (const node of pathArray) {
        if (active) break

        if (node?.dataset?.preview) {
            let result = null
    
            for (const singleBook of books) {
                if (result) break;
                if (singleBook.id === node?.dataset?.preview) result = singleBook
            } 
        
            active = result
        }
    }
    
    if (active) {
        html.list.active.open = true
        html.list.blur.src = active.image
        html.list.image.src = active.image
        html.list.title.innerText = active.title
        html.list.subtitle.innerText = `${authors[active.author]} (${new Date(active.published).getFullYear()})`
        html.list.description.innerText = active.description
    }
})


