

// get user input and load api 

document.getElementById('search-btn').addEventListener('click',function (){
    const rawText = document.getElementById('search-txt')
    
    const txt = rawText.value.toLowerCase();
    rawText.value = ''

    if(txt){
        url = `https://openapi.programming-hero.com/api/phones?search=${txt}` 

        fetch(url)
        .then(res => res.json())
        .then(data => showPhones(data))

    }
    else{
        alert('please type phone name')
    }
    

})


// functon for show all phone data 

const showPhones = (phonesObject) => {
    if(phonesObject.status){
        const phones = phonesObject.data
        
        let counter = 0;
        const phoneSection = document.getElementById('phones')
        phoneSection.textContent = ''
        phones.forEach(phone => {
            
            if ( counter < 20 ){
                counter ++ ;
                const div = document.createElement('div')
                div.classList.add('col', 'mb-4')
                div.innerHTML = `
                            <div class=" card h-100 container-fluid pt-3">
                                <img class="" src="${phone.image}" class="card-img-top" alt="...">
                                <div class="card-body">
                                    <h5 class="card-title">${phone.phone_name}</h5>
                                    <p class="card-text">Brand : ${phone.brand}</p>
                                </div>
                                <button class="btn btn-primary p-2 mb-2" type="button">Details</button>
                            </div>
              `;

              phoneSection.appendChild(div);



                
            }
            
        });



    }
    else{
        alert("sir ai phone to amr kase nai")
    }
}

