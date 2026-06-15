const hotelDatabase = [
    {
        name: "The Bengaluru Grand Luxury",
        location: "Bengaluru",
        price: 6500,
        rating: "4.8 ★",
        image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=400&q=80",
        description: "Premium suites featuring an infinity pool and close access to MG Road."
    },
    {
        name: "Garden City Boutique Stay",
        location: "Bengaluru",
        price: 3200,
        rating: "4.3 ★",
        image: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=400&q=80",
        description: "Cozy eco-friendly stay with free high-speed Wi-Fi and complimentary breakfast."
    },
    {
        name: "Silicon Valley Tech Hotel",
        location: "Bengaluru",
        price: 4800,
        rating: "4.5 ★",
        image: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=400&q=80",
        description: "Modern minimalist rooms localized perfectly within Electronic City."
    },
    {
        name: "The Royal Orchid Palace",
        location: "Bengaluru",
        price: 7200,
        rating: "4.7 ★",
        image: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=400&q=80",
        description: "Experience heritage luxury with sprawling gardens and fine dining options."
    },
    {
        name: "Transit Oasis Hub",
        location: "Bengaluru",
        price: 2800,
        rating: "4.1 ★",
        image: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?auto=format&fit=crop&w=400&q=80",
        description: "Sleek, budget-friendly modern rooms located close to the airport lines."
    },
    {
        name: "The Urban Canopy",
        location: "Bengaluru",
        price: 5100,
        rating: "4.6 ★",
        image: "https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=400&q=80",
        description: "Rooftop lounge suites overlooking the beautiful city skyline landscape."
    },
    {
        name: "Mumbai Seafront Resort",
        location: "Mumbai",
        price: 8900,
        rating: "4.9 ★",
        image: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=400&q=80",
        description: "Stunning balcony vistas overlooking Marine Drive beachfronts."
    },
    {
        name: "Gateway Boutique Suites",
        location: "Mumbai",
        price: 6200,
        rating: "4.4 ★",
        image: "https://images.unsplash.com/photo-1568084680786-a84f91d1153c?auto=format&fit=crop&w=400&q=80",
        description: "Classic elegant architecture paired with premier service blocks near Colaba."
    },
    {
        name: "The Juhu Deck Hotel",
        location: "Mumbai",
        price: 4500,
        rating: "4.2 ★",
        image: "https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?auto=format&fit=crop&w=400&q=80",
        description: "Relaxed rooms directly neighboring the lively beaches and cafe spots."
    }
];

document.getElementById('searchForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const destinationInput = document.getElementById('destinationInput').value.trim();
    const resultsSection = document.getElementById('searchResultsSection');
    const resultsGrid = document.getElementById('searchResultsGrid');
    const locationTitle = document.getElementById('searchLocationTitle');

    const filteredHotels = hotelDatabase.filter(hotel => 
        hotel.location.toLowerCase() === destinationInput.toLowerCase()
    );

    resultsGrid.innerHTML = "";

    if (filteredHotels.length === 0) {
        locationTitle.innerText = `"${destinationInput}"`;
        resultsGrid.innerHTML = `
            <div class="col-12 text-center my-4 text-muted">
                <i class="bi bi-exclamation-circle fs-2"></i>
                <p class="mt-2">No properties matched your destination. Try searching 'Bengaluru' or 'Mumbai'.</p>
            </div>`;
    } else {
        locationTitle.innerText = destinationInput;
        
        filteredHotels.forEach((hotel, index) => {
            const originalIndex = hotelDatabase.findIndex(h => h.name === hotel.name);

            const cardHTML = `
                <div class="col-12 col-md-6 col-lg-4">
                    <div class="card h-100 shadow-sm border-0">
                        <div class="position-relative">
                            <img src="${hotel.image}" class="card-img-top" alt="${hotel.name}">
                            <span class="badge bg-success position-absolute top-0 end-0 m-3">${hotel.rating}</span>
                        </div>
                        <div class="card-body d-flex flex-column">
                            <h5 class="card-title fw-bold fs-6 mb-1">${hotel.name}</h5>
                            <p class="text-muted small mb-2">📍 ${hotel.location}</p>
                            <p class="card-text text-muted small flex-grow-1">${hotel.description}</p>
                            <div class="d-flex justify-content-between align-items-center mt-3 pt-2 border-top">
                                <div>
                                    <span class="fw-bold text-primary fs-5">₹${hotel.price.toLocaleString('en-IN')}</span>
                                    <span class="text-muted small">/ night</span>
                                </div>
                                <button class="btn btn-primary btn-sm fw-bold px-3 btn-book-now" data-index="${originalIndex}">Book Now</button>
                            </div>
                        </div>
                    </div>
                </div>
            `;
            resultsGrid.innerHTML += cardHTML;
        });
    }

    resultsSection.classList.remove('d-none');
    resultsSection.scrollIntoView({ behavior: 'smooth' });
});

document.addEventListener('click', function(event) {
    if (event.target && event.target.classList.contains('btn-book-now')) {
        const index = event.target.getAttribute('data-index');
        const selectedHotel = hotelDatabase[index];

        if (selectedHotel) {
            const basePrice = selectedHotel.price;
            const taxAmount = Math.round(basePrice * 0.12);
            const totalPayable = basePrice + taxAmount;

            document.getElementById('modalHotelName').innerText = selectedHotel.name;
            document.getElementById('modalHotelLocation').innerText = `📍 ${selectedHotel.location}`;
            document.getElementById('modalHotelImg').src = selectedHotel.image;
            document.getElementById('modalBasePrice').innerText = `₹${basePrice.toLocaleString('en-IN')}`;
            document.getElementById('modalTaxPrice').innerText = `₹${taxAmount.toLocaleString('en-IN')}`;
            document.getElementById('modalTotalPrice').innerText = `₹${totalPayable.toLocaleString('en-IN')}`;

            const bookingModalEl = document.getElementById('bookingModal');
            const modalInstance = bootstrap.Modal.getOrCreateInstance(bookingModalEl);
            modalInstance.show();
        }
    }
});

document.getElementById('finalCheckoutForm')?.addEventListener('submit', function(e) {
    e.preventDefault();
    window.location.href = "confirmation.html";
});