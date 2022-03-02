const DisplaySwitch = (id,displayType) => {
  const htmlElemnt = document.getElementById(id);
  htmlElemnt.style.display = displayType;
}


// get user input and load api 

document.getElementById('search-btn').addEventListener('click',function (){
    DisplaySwitch('spiner','block');
    DisplaySwitch('all-phone','none');
    
    const rawText = document.getElementById('search-txt');
    const txt = rawText.value.toLowerCase();
    
    rawText.value = '';

    if(txt){
        url = `https://openapi.programming-hero.com/api/phones?search=${txt}` ;

        fetch(url)
        .then(res => res.json())
        .then(data => showPhones(data))

    }
    else{
        alert('please type phone name');
    }
    

})


// functon for show all phone data 

const showPhones = (phonesObject) => {
    const phoneSection = document.getElementById('phones');
    phoneSection.textContent = '';
    document.getElementById('phone-details').textContent = '';
    if(phonesObject.status){
        const phones = phonesObject.data;
        
        let counter = 0;
        
        phones.forEach(phone => {
            
            if ( counter < 20 ){
                counter ++ ;
                const div = document.createElement('div');
                div.classList.add('col', 'mb-4');
                div.innerHTML = `
                            <div class=" card h-100 container-fluid pt-3">
                                <img class="" src="${phone.image}" class="card-img-top" alt="...">
                                <div class="card-body">
                                    <h5 class="card-title">${phone.phone_name}</h5>
                                    <p class="card-text">Brand : ${phone.brand}</p>
                                </div>
                                <button onclick="loadPhoneDetail('${phone.slug}')" class="btn btn-primary p-2 mb-2 fw-bold" type="button">Details</button>
                            </div>
              `;

              phoneSection.appendChild(div);
                
            }
            
        });

    }
    else{
        alert("sir ai phone to amr kase nai");
    }
    DisplaySwitch('spiner','none')
    DisplaySwitch('all-phone','block')
}

// load phone ditails

const loadPhoneDetail = slug => {

    const url = `https://openapi.programming-hero.com/api/phone/${slug}`;

    fetch(url)
        .then(res => res.json())
        .then(data => showPhoneDetails(data))

}


// show spechic phone to fontpage

const showPhoneDetails = phone => {
   
    if(!phone.status){
        alert('sorry sir amr kase ditails info nai')
    }
    else{
        const phoneData = phone.data;
        const phoneDetailsBox = document.getElementById('phone-details')
        phoneDetailsBox.textContent = '';
        
        div = document.createElement('div');
        div.classList.add('row', 'row-cols-2',  'mx-auto', 'my-5')
        div.innerHTML = `
        
            <img class=" col-12 col-sm-4 my-5 " src="${phoneData.image}" alt="">
              
            <div class="col-12 col-sm-8">
                <table class="table">
                    <tbody>
                      <tr>
                        
                        <td>Model</td>
                        <td>${phoneData.name}</td>
                      </tr>
                      <tr>
                        
                        <td>Brand</td>
                        <td>${phoneData.brand}</td>
                      </tr>
                      <tr>
                        
                        <td >Display</td>
                        <td >${phoneData.mainFeatures.displaySize}</td>
                      </tr>
                      <tr>
                        
                        <td >Storage</td>
                        <td >${phoneData.mainFeatures.storage}</td>
                      </tr>
                      <tr>
                        
                        <td >Chipset</td>
                        <td >${phoneData.mainFeatures.chipSet}</td>
                      </tr>
                      <tr>
                        
                        <td >Memory</td>
                        <td >${phoneData.mainFeatures.memory}</td>
                      </tr>
                      <tr>
                        
                        <td >Sensors</td>
                        <td >${phoneData.mainFeatures.sensors.join(', ')}</td>
                      </tr>
                      <tr>
                        
                        <td >Released Date</td>
                        <td >${phoneData.releaseDate  ? phoneData.releaseDate : 'Release Date not avilable'}</td>
                      </tr>
                      <tr>
                        
                        
                      </tr>
                    </tbody>
                  </table>
                  

            </div>
            
        `;

        const table = document.createElement('table');
        table.classList.add('table')
        const tbody = document.createElement('tbody');
        if(phoneData?.others){
          for(const keys in phoneData?.others){
            tr = document.createElement('tr');
            value = phoneData.others[keys];
            tr.innerHTML = `
            
                  <td class='col-6' >${keys}</td>
                  <td class='col-6'>${value}</td>
  
            `
            tbody.appendChild(tr);
          }
  
          table.appendChild(tbody)

        }
        

        
        phoneDetailsBox.appendChild(div);
        phoneDetailsBox.appendChild(table);

    }
}

const otherFeaturesShow = others => {
  console.log(others)
}