export const login = async ({ username, password }) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (username === "demo" && password === "demo") {
        resolve();
      } else {
        reject();
      }
    }, 1000);
  });
};
