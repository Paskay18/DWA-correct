// scripts.js

const form = document.querySelector("[data-form]");
const result = document.querySelector("[data-result]");

form.addEventListener("submit", (event) => {
   event.preventDefault();
   const entries = new FormData(event.target);
   const { dividend, divider } = Object.fromEntries(entries);
   result.innerText = dividend / divider;
});

//decimal number to appear as a whole number
form.addEventListener("submit", (event)=> {
    event.preventDefault();
    const decimalNumber = new FormData(event.target);
    const {dividend, divider} = Object.fromEntries(decimalNumber);
    result.innerText= Math.trunc(dividend/divider);
});

//if either or both are empty no division is done should be displayed

form.addEventListener("submit",(event)=> {
    event.preventDefault();

    const inputs = new FormData(event.target);
    const { dividend, divider} = Object.fromEntries(inputs)
 
    try{
      if (dividend === '') {
           throw 'Division not performed. Both values are required in inputs.Try again'
        }
        
      if (divider ==='') {
           throw 'Division not performed. Both values are required in inputs.Try again'
        }
     
      if(dividend && divider === '') {
            throw 'Division not performed. Both values are required in inputs.Try again'
        }
    } catch (error) {
        result.innerText = error
        console.log(error)
    };
    
} );


//Invalid division that logs error in console

form.addEventListener("submit",(event)=> {
    event.preventDefault();

    const inputs = new FormData(event.target);
    const { dividend, divider} = Object.fromEntries(inputs)
 
    try{
        if (dividend > 0 && divider < 0) {
           throw 'Division not performed. Invalid number provided. Try again'
        }
        
    }catch (error){
        result.innerText = error;
        console.log(error);
    };
    
} );


//providing anything that is not a number 

form.addEventListener('submit',(event)=> {
    event.preventDefault();
    
    
    const inputs = new FormData(event.target);
    const { dividend, divider} = Object.fromEntries(inputs)
 
   
  
        if (isNaN(dividend)|| isNaN(divider)) {
            document.body.innerHTML = "Something critical went wrong. Please reload the page"
        }
     console.log('Inputs that were put are not numbers')
   
    
} );




