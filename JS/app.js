const displayPhoneSection = document.getElementById("display-phone-area");
const searchText = document.getElementById("search-box");
const errorSection = document.getElementById('error-message');
const detailSection = document.getElementById('display-detail');

/* =========================      load phone       ========================= */
const loadPhone = () => {
    const searchPhone = searchText.value;
    fetch(`https://openapi.programming-hero.com/api/phones?search=${searchPhone}`)
        .then(res => res.json())
        .then(data => displayPhone(data.data))
        .catch(err => console.log(err));
}

/* ====================   search btn event handler   ==================== */
document.getElementById("search-btn").addEventListener("click", function () {
    if (searchText.value !== '') {
        loadPhone();
        errorSection.style.display = "none";
        searchText.value = '';
    }
});

/* =========================     display phone     ========================= */
const displayPhone = phones => {
    const phonesLimit = phones.slice(0,20);
    displayPhoneSection.textContent = "";
    detailSection.textContent = "";
    if (phones.length === 0) {
        displayError();
    }
    else {
        phonesLimit.forEach(phone => {
            const div = document.createElement('div');
            div.classList.add('col')
            div.innerHTML = `
                <div class="card text-center">
                    <img src="${phone.image}" class="card-img-top mh-50" alt="...">
                    <div class="card-body">
                    <h5 class="card-title">${phone.phone_name}</h5>
                    <p class="card-text">${phone.phone_name} is the most popular brand phone of ${phone.brand} company. To know more feature and details "Explore it"</p>
                    </div>
                    <div class="d-flex justify-content-center my-3">
                        <button class="btn btn-primary w-50" onclick="loadDetail('${phone.slug}')">Explore</button>
                    </div>
                </div>
            `;
            displayPhoneSection.appendChild(div)
        });
    }
};

/* =========================      error message       ========================= */
const displayError = () => {
    errorSection.style.display = 'block';
}

/* =========================     load details      ========================= */
const loadDetail = (phoneId) => {
    fetch(`https://openapi.programming-hero.com/api/phone/${phoneId}`)
        .then(res => res.json())
        .then(data => displayDetail(data.data))
}

/* =========================     display details      ========================= */
const displayDetail = (detail) => {
    detailSection.textContent = "";
    const div = document.createElement('div');
    div.classList.add('row');
    div.innerHTML = `
        <div class="row">
            <div class="col">
                <div class="card mb-3" style="max-width: 540px; height:220px;">
                    <div class="row g-0">
                        <div class="col-md-4">
                            <img src="${detail.image}" class="img-fluid rounded-start" alt="...">
                        </div>
                        <div class="col-md-8">
                            <div class="card-body">
                                <h5 class="card-title" style="color:#ff4000">${detail.name}</h5>
                                <h6 style="color:steelBlue">${detail.releaseDate ? detail.releaseDate : 'No result'}</h6>
                                <p class="card-text"><span style="color:red;font-weight:bold">Feature:</span> ${detail.mainFeatures.storage} . ${detail.mainFeatures.chipSet} . ${detail.mainFeatures.displaySize} . ${detail.mainFeatures.memory}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col">
                <div class="card" style="width: 540px;height:220px;">
                    <div class="card-body">
                        <h5 class="card-title">Sensors & More</h5>
                        <p class="card-text"><span style="color:red;font-weight:bold">Sensors: </span>${detail.mainFeatures.sensors}</p>
                        <p class="card-text"><span style="color:red;font-weight:bold">Others: </span>Bluetooth: ${detail.others.Bluetooth ? detail.others.Bluetooth : 'No result found'} #GPS: ${detail.others.GPS ? detail.others.GPS :'No result found'} #NFC: ${detail.others.NFC ? detail.others.NFC :'No result found'} #WLAN: ${detail.others.WLAN ? detail.others.WLAN :'No result found'} #Radio: ${detail.others.Radio} #USB: ${detail.others.USB ? detail.others.USB :'No result found'}</p>
                    </div>
                </div>
            </div>
        </div>
    `;
    detailSection.appendChild(div)
}