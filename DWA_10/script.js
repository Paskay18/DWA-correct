const STEP_AMOUNT =5
const MIN_NUMBER = -5


const number=document.querySelector('[data-key="number"]')
const substract=document.querySelector('[data-key="subtract"]')
const add=document.querySelector('[data-key="add"]')
const reset =document.querySelector('[data-key="Reset"]')


const substractHandler = () => {
    const newValue= parseInt(number.value)-1
    number.value=newValue

    if(add.disabled===true){
        add.disabled=false
    }
     
        if(newValue<=MIN_NUMBER){
            substract.disabled=true
        }
}


const addHandler = () => { 
    const newValue= parseInt(number.value)+1
    number.value=newValue


     if(substract.disabled===true){
        substract.disabled=false 
    }
    
}
substract.addEventListener('click', substractHandler)
add.addEventListener('click', addHandler)


//add reset button
const resetHandler = () => {
    

if (number.value){
        number.value = 0
        window.alert('Counter has been reset') 
   }
}
reset.addEventListener('click', resetHandler)


