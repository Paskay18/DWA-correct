const provinces = ['Western Cape', 'Gauteng', 'Northern Cape', 'Eastern Cape', 'KwaZulu-Natal', 'Free State']
const names = ['Ashwin', 'Sibongile', 'Jan-Hendrik', 'Sifso', 'Shailen', 'Frikkie']


//calling each name and province
names.forEach((names, i) => {
console.log(`${names}`.concat(`(${provinces[i]})`))
    })
    
//names
names.forEach((names) => {
console.log(names)
    })
    
    
//filter
const filterCapeProvinces = provinces.filter((cape)=> {
        return !cape.includes('Cape')
    })
console.log(filterCapeProvinces)
    

//map of names to uppercase
const toUpperCase = provinces.map(upperCase => {return upperCase.toUpperCase()} )
console.log(toUpperCase)

//map of number of characters

const toNumbers = names.map( (numbers) =>{
    return numbers.length
    })
console.log(toNumbers)
    
//sort
const sortNames = provinces.sort( (a,b)  => {
        if (a < b) {return -1;}
        if (b > a) {return 1;}
        return 0;
        
      } );
console.log(sortNames)

//map and some
const toBoolean = names.map( (name) => name.split('').some(char => char.toLowerCase() == 's'))
console.log(toBoolean)

//using reduce

const object = names.reduce((name, obj, index) => {
    obj[name] = provinces[index];
    return obj;
}, {});
console.log(object)


//Additional questions

//each name

products.forEach(product => console.log( product.product))


//filter that has longer than 5 characters

const filter5 = products.filter( char5 => char5.product.length> 5 );
console.log(filter5)   

