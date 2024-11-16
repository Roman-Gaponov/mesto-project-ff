const loginConfig = {
  cohortId: "wff-cohort-26",
  token: "3030b019-4537-4e11-8fa7-8b770ae8139c",
};

const connectionConfig = {
  baseUrl: `https://nomoreparties.co/v1/${loginConfig.cohortId}`,
  headers: {
    authorization: loginConfig.token,
    "Content-Type": "application/json",
  },
};

function fetchData(connectionConfig, src = "", method = "GET") {
  switch (method) {
    case "GET": {
      return fetch(`${connectionConfig.baseUrl}/${src}`, {
        headers: connectionConfig.headers,
      });
    }
    case "POST": {
      return fetch(`${connectionConfig.baseUrl}/${src}`, {
        method: method,
        headers: connectionConfig.headers,
      });
    }
    case "PATCH": {
      return fetch(`${connectionConfig.baseUrl}/${src}`, {
        method: method,
        headers: connectionConfig.headers,
        body: JSON.stringify({
          name: "Roman Gaponov",
          about: "Data Analyst",
        }),
      });
    }
    case "DELETE": {
      return fetch(`${connectionConfig.baseUrl}/${src}`, {
        method: method,
        headers: connectionConfig.headers,
      });
    }
  }
}

function getProfileData(profileConfig) {
  const src = "users/me";
  fetchData(connectionConfig, src)
    .then((result) => {
      if (result.ok) {
        return result.json();
      }
      return Promise.reject(result.status);
    })
    .then((resultData) => {
      document.querySelector(profileConfig.nameSelector).textContent =
        resultData.name;
      document.querySelector(profileConfig.descriptionSelector).textContent =
        resultData.about;
      document.querySelector(profileConfig.avatarSelector).src =
        resultData.avatar;

      // console.log(resultData);
    })
    .catch((err) => {
      console.log(`Ошибка: ${err}`);
      //renderError(`Ошибка: ${err}`);
    });
  //.finally(() => {
  //renderLoading(false);
  //})
}

function setProfileData() {}

export { getProfileData };
