export const getUsers = async () => {
  fetch("http://localhost:3000/user/")
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((userData) => {
      return userData.users;
    })
    .catch((error) => {
      return [];
    });
};
