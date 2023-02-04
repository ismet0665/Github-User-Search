const base_url = "https://api.github.com/users/";

const input = document.querySelector(".search");
const buton = document.querySelector(".buton");
const userContainer = document.querySelector(".user-container");
const followersContainer = document.querySelector(".followers-container");

buton.addEventListener("click", () => {
  getUser();
});

async function getUser() {
  const url = base_url + input.value;

  try {
    const res = await fetch(url);
    const data = await res.json();
    console.log(data);
    const {
      avatar_url,
      followers,
      followers_url,
      following,
      html_url,
      public_repos,
      login,
    } = data;

    userContainer.innerHTML = `
    <div class="card" style="width: 24rem;">
      <img src=${avatar_url} class="card-img-top" alt="...">
      <div class="card-body">
        <h3 class="card-title text-center">${login}</h3>
        <div class="row my-4">
          <div class="col-4">
            <h5 class=" text-bg-primary rounded-3 py-2 text-center">repos</h5>
            <p class="text-center fw-bolder fs-4">${public_repos}</p>
          </div>
          <div class="col-4">
            <h5 class=" text-bg-primary rounded-3 py-2 text-center">followers</h5>
            <p class="text-center fw-bolder fs-4">${followers}</p>
          </div>
          <div class="col-4">
            <h5 class=" text-bg-primary rounded-3 py-2 text-center">following</h5>
            <p class="text-center fw-bolder fs-4">${following}</p>
          </div>
        </div>
        <div class="text-center">
          <a href=${html_url} target="_blank" class="btn btn-primary">Github Profile</a>
        </div>
      </div>
    </div>   `;
    getFollowings(followers_url);
  } catch (error) {
    userContainer.innerHTML = `<h1 class="text-danger" >${data.message}</h1>`;
  }
}

async function getFollowings(followers_url) {
  try {
    const res = await fetch(followers_url);
    const followers = await res.json();
    // console.log(followers);
    followers.forEach((user) => {
      followersContainer.innerHTML += `
    <div class="card w-25" >
      <img src=${user.avatar_url} class="card-img-top " alt="...">
      <div class="card-body">
        <h3 class="card-title text-center">${user.login}</h3>
        <div class="text-center">
          <a href=${user.html_url} target="_blank" class="btn btn-primary">Github Profile</a>
        </div>
      </div>
    </div>   `;
    });
  } catch (error) {
    console.log(error);
  }
}
