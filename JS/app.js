const displayPhoneSec = document.getElementById("display-phone-area");
const searchText = document.getElementById("search-box");

/* =========================      load phone       ========================= */
const loadPhone = () => {
    const searchPhone = searchText.value;
    fetch(`https://openapi.programming-hero.com/api/phones?search=${searchPhone}`)
        .then(res => res.json())
        .then(data => displayPhone(data.data))
}

/* ====================   search btn event handler   ==================== */
document.getElementById("search-btn").addEventListener("click", function () {
    loadPhone();
});

/* =========================     display phone     ========================= */
const displayPhone = phones => {
    phones.forEach(phone => {
        const div = document.createElement('div')
        div.classList.add('col')
        div.innerHTML = `
            <div class="card text-center">
                <img src="${phone.image}" class="card-img-top mh-50" alt="...">
                <div class="card-body">
                <h5 class="card-title">${phone.phone_name}</h5>
                <p class="card-text">${phone.phone_name} is the most popular brand phone of ${phone.brand} company. To know more feature and details "Explore it"</p>
                </div>
                <div class="d-flex justify-content-center my-3">
                    <button class="btn btn-primary w-50">Explore</button>
                </div>
            </div>
        `;
        displayPhoneSec.appendChild(div)
    });
};

/* =========================      load phone       ========================= */