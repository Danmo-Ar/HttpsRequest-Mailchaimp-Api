/* grab element so we need */

const form = document.getElementById('form');
const username = document.getElementById('username');
const email = document.getElementById('email');
const address = document.getElementById('address');



//Show error Mesage 

function showError(input , message){

    const formControl = input.parentElement; // grap the parent of input we verify
    formControl.className = 'form-control error';
    const small = formControl.querySelector('small');
    //small.textContent = message;
    small.innerText = message; 

}

// Show Sucess Message 

function showSucess(input) {
    const formControl = input.parentElement; // grap the parent of input we verify
    formControl.className = 'form-control sucess';
    
}

// Email is valid

function checkEmail(input){ // va nous permettre de definir la methode de verifiacation de nos email

     const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/; 
     
     if(re.test(input.value.trim())){
          showSucess(input);
     }else{
         showError(input , 'Email is not valid')
     }
}


/* checkRequired */ // make a loop to passe on evrey inputs field

function checkRequired(inputArray){
    inputArray.forEach(function(input){ // foreach permit to execute a function on each element of array
        if(input.value.trim() === ''){
            showError(input , ` ${getFieldName(input)} Is Required`);
        }else {
            showSucess(input);
        }
    });
}

function getFieldName(input){
    return input.id.charAt(0).toUpperCase() + input.id.slice(1);
}

/* function for length of input */ 

function checkLength(input , min , max) { //permet de creer une fonctionp qui vas nous permettre de verifier la longuer des champs

    if(input.value.length < min){
        showError(input , `${getFieldName(input)} must be least ${min} characters`);
    }else if(input.value.length > max) {
        showSucess(input , `${getFieldName(input)} must be less than ${max} characters`);
    }else {
        showSucess(input);
    }
}



//Event listener */ 

form.addEventListener('submit' , function(e){
    //  e.preventDefault();

   checkRequired([username , email ,address]);
   checkLength(username , 3 , 15);
   checkEmail(email);
  

});