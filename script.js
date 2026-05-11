fetch('data.json')
  .then(res => res.json())
  .then(data => {

    document.getElementById('email').textContent = data.email;
    document.getElementById('phone').textContent = data.phone;
    document.getElementById('city').textContent = data.city;
    document.getElementById('about').textContent = data.about;

    function fillList(id, items) {

      const ul = document.getElementById(id);

      items.forEach(item => {

        const li = document.createElement('li');

        li.textContent = item;

        ul.appendChild(li);

      });
    }

    fillList('skills', data.skills);
    fillList('languages', data.languages);
    fillList('hobby', data.hobby);
    fillList('projects', data.projects);

  })

  .catch(err => console.error(err));



const form = document.getElementById('contactForm');

form.addEventListener('submit', async (e) => {

  e.preventDefault();

  const data = {

    name: document.getElementById('name').value,

    email: document.getElementById('userEmail').value,

    message: document.getElementById('message').value

  };

  try {

    const response = await fetch('/messages', {

      method: 'POST',

      headers: {
        'Content-Type': 'application/json'
      },

      body: JSON.stringify(data)

    });

    if (response.ok) {

      document.getElementById('status').textContent =
        'Wiadomość została wysłana!';

      form.reset();

    } else {

      document.getElementById('status').textContent =
        'Błąd serwera';

    }

  } catch (error) {

    document.getElementById('status').textContent =
      'Błąd połączenia';

  }

});