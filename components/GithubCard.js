// 🛠️ STEP 1: Fetch GitHub Data
// 1️⃣ Use Axios to send a GET request to `https://api.github.com/users/<your_name>`.
// 2️⃣ Log the response data to inspect its structure.
// 3️⃣ Look at important fields like `name`, `avatar_url`, `location`, `followers`, `following`, `bio`, and `followers_url`.
// 4️⃣ Pass the data into a function to create a user card.
// 5️⃣ Append the created card to the `.cards` container in the DOM.


// 🛠️ STEP 2: Create a Function to Build the Card
// 1️⃣ Write a function that takes a **user object** as a parameter.
// 2️⃣ Use JavaScript DOM methods to create the following structure:
//
//     <div class="card">
//       <img src="{avatar_url}" />
//       <div class="card-info">
//         <h3 class="name">{name}</h3>
//         <p class="username">{login}</p>
//         <p>Location: {location}</p>
//         <p>Profile: <a href="{html_url}">{html_url}</a></p>
//         <p>Followers: {followers}</p>
//         <p>Following: {following}</p>
//         <p>Bio: {bio}</p>
//       </div>
//     </div>
//
// 3️⃣ Return the created card element.


// 🛠️ STEP 3: Add the Card to the DOM
// 1️⃣ Call the function with the GitHub data.
// 2️⃣ Select the `.cards` container using `document.querySelector('.cards')`.
// 3️⃣ Append the created card to the `.cards` container.


// 🛠️ STEP 4: Fetch Followers Data
// 1️⃣ Use the `followers_url` from the GitHub user data.
// 2️⃣ Send a GET request to fetch follower information.
// 3️⃣ Log the response data to inspect its structure.
// 4️⃣ For each follower:
//     - Create a card using the function.
//     - Append the card to the `.cards` container.


// 🛠️ STRETCH: Add More GitHub Users
// 1️⃣ Create an array `followersArray` with at least 5 GitHub usernames.
// 2️⃣ Loop through the array and send a GET request for each username.
// 3️⃣ Create a card for each user and append it to `.cards`.


// 🌟 BONUS TIP:
// 🎨 Style your cards using CSS to make them look polished!
// 🤖 Try experimenting with different GitHub profiles!



axios.get('https://api.github.com/users/abdillahi485')
  .then(response => {
    console.log(response.data); 

    const userData = response.data;

    createUserCard(userData);
  })
  .catch(error => {
    console.error('Error fetching GitHub data:', error);
  });

function createUserCard(userData) {
  const card = document.createElement('div');
  card.classList.add('card');

  const img = document.createElement('img');
  img.src = userData.avatar_url;
  img.alt = 'User Avatar';

  const cardInfo = document.createElement('div');
  cardInfo.classList.add('card-info');
  const name = document.createElement('h3');
  name.classList.add('name');
  name.textContent = userData.name || 'No name provided';

  const username = document.createElement('p');
  username.classList.add('username');
  username.textContent = userData.login;

  const location = document.createElement('p');
  location.textContent = `Location: ${userData.location || 'Not available'}`;

  const profileLink = document.createElement('p');
  profileLink.innerHTML = `Profile: <a href="${userData.html_url}" target="_blank">${userData.html_url}</a>`;

  const followers = document.createElement('p');
  followers.textContent = `Followers: ${userData.followers}`;

  const following = document.createElement('p');
  following.textContent = `Following: ${userData.following}`;

  const bio = document.createElement('p');
  bio.textContent = `Bio: ${userData.bio || 'No bio available'}`;

  cardInfo.append(name, username, location, profileLink, followers, following, bio);

  card.append(img, cardInfo);

  const cardsContainer = document.querySelector('.cards');
  cardsContainer.appendChild(card);
}



axios.get('https://api.github.com/users/abdillahi485/followers')
  .then(response => {
    console.log(response.data);

    response.data.forEach(follower => {
      axios.get(follower.url)
        .then(followerResponse => {
          createUserCard(followerResponse.data);
        })
        .catch(error => {
          console.error('Error fetching follower data:', error);
        });
    });
  })
  .catch(error => {
    console.error('Error fetching followers:', error);
  });

  const usernames = ['duraanali', '4hmedhabib', 'Abdiasis-Mustafe'];
usernames.forEach(username => {
  axios.get(`https://api.github.com/users/${username}`)
    .then(response => {
      createUserCard(response.data);
    })
    .catch(error => {
      console.error('Error fetching GitHub data:', error);
    });
});
