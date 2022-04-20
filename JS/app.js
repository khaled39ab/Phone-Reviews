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
    displayPhoneSection.textContent = "";
    if (phones.length === 0) {
        displayError();
    }
    else {
        phones.forEach(phone => {
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
    const div = document.createElement('div');
    div.classList.add('row');
    div.innerHTML = `
    <div class="card mb-3" style="max-width: 540px;">
        <div class="row g-0">
            <div class="col-md-4">
                <img src="${detail.image}" class="img-fluid rounded-start" alt="...">
            </div>
            <div class="col-md-8">
                <div class="card-body">
                    <h5 class="card-title">Card title</h5>
                    <p class="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                    <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p>
                </div>
            </div>
        </div>
    </div>
    `;
    detailSection.appendChild(div)
}