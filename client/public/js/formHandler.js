const apiURL = 'http://localhost:3000/api';

document.addEventListener('contentLoaded', (event) => {
    const currentItem = event.detail?.currentItem;

    console.log(currentItem)
    if (!currentItem || currentItem.id !== 'contacts') {

        return;
    }

    const form = document.querySelector('#user-form');

    // Handle form submission
    form.addEventListener('submit', async (event) => {
        event.preventDefault();

        const email = form.querySelector('#email').value;
        const name = form.querySelector('#name').value;
        const state = stateSelect.value;
        const city = citySelect.value;

        // Send data to the server
        try {
            const response = await fetch(`${apiURL}/users/create`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, name, state, city }),
            });

            if (response.ok) {
                const data = await response.json();
                alert(data.message);
                form.reset();
                stateSelect.innerHTML = '<option value="">Select a state</option>';
                citySelect.innerHTML = '<option value="">Select a city</option>';
                citySelect.disabled = true;
                fetchStates();
                validateForm();
            } else {
                const errorData = await response.json();
                alert(errorData.error || 'Error creating user');
            }
        } catch (error) {
            console.error('Error submitting form:', error);
            alert('An error occurred while creating the user.');
        }
    });


    const stateSelect = document.getElementById('state');
    const citySelect = document.getElementById('city');

    // Fetch states and populate the dropdown
    const fetchStates = async () => {
        try {
            const response = await fetch(`${apiURL}/locations/states`);
            const states = await response.json();

            stateSelect.innerHTML = '<option value="">Select a state</option>';
            states.forEach((state) => {
                const option = document.createElement('option');
                option.value = state.iso;
                option.textContent = state.name;
                stateSelect.appendChild(option);
            });

            stateSelect.disabled = false;
        } catch (error) {
            console.error('Error fetching states:', error);
        }
    };

    // Fetch cities based on selected state
    const fetchCities = async (stateCode) => {

        try {
            const response = await fetch(`${apiURL}/locations/cities?stateCode=${stateCode}`);
            const cities = await response.json();
            console.log(stateCode, cities)

            citySelect.innerHTML = '<option value="">Select a city</option>';
            cities.forEach((city) => {
                const option = document.createElement('option');
                option.value = city.name;
                option.textContent = city.name;
                citySelect.appendChild(option);
            });

            citySelect.disabled = false;
            citySelect.dispatchEvent(new Event('change'));
        } catch (error) {
            console.error('Error fetching cities:', error);
        }
    };

    // Handle state change
    stateSelect.addEventListener('change', () => {
        const stateCode = stateSelect.value;
        if (stateCode) {
            fetchCities(stateCode);
        } else {
            citySelect.innerHTML = '<option value="">Select a city</option>';
            citySelect.disabled = true;
            citySelect.dispatchEvent(new Event('change'));
        }
        validateForm();
    });

    citySelect.addEventListener('change', () => {
        validateForm();
    });



    function validateForm() {
        const state = stateSelect.value;
        const city = citySelect.value;
        const submitButton = document.querySelector('#submit');

        if (!state || !city) {
            submitButton.disabled = true;
        } else {
            submitButton.disabled = false;
        }
    }

    // Initialize states on page load
    fetchStates();
    validateForm();
});