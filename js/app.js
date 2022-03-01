

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
        phones.forEach(phone => {
            
            if ( counter < 20 ){
                counter ++ ;
                const div = document.createElement('div')
                div.classList.add('col')

                div.innerHTML = `
                            <div class="card h-100 container-fluid">
                                <img class="img-fluid" src="https://fdn2.gsmarena.com/vv/bigpic/apple-iphone-11-pro.jpg" class="card-img-top" alt="...">
                                <div class="card-body">
                                    <h5 class="card-title">Card title</h5>
                                    <p class="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                                </div>
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

