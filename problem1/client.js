const fetch = require("node-fetch");

async function fetchTodosOfUsers(userIdArray, lengthOfUserIdArray, chunk) {
  let start = 0;
  let end = chunk;
  const userTodos = [];
  while (start < lengthOfUserIdArray) {
    const fiveUsersTodos = [];
    while (start < end) {
      const response = await fetch(
        `http://localhost:3000/todos?user_id=${userIdArray[start]}`
      );
      const data = (await response.json()).todos;
      fiveUsersTodos.push(data);

      start++;
    }
    userTodos.push(fiveUsersTodos);

    start = end;
    end = end + 5;

    console.log(fiveUsersTodos)

    if (start < lengthOfUserIdArray) {
      await new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve();
        }, 1000);
      });
    }
  }

  return userTodos;
}
fetchTodosOfUsers();

// write your code here
async function main() {
  const userResponse = await fetch("http://localhost:3000/users");
  const userData = (await userResponse.json()).users;

  const userName = userData.map((user) => user.name);
  const userIdArray = userData.map((user) => user.id);

  const lengthOfUserIdArray = userIdArray.length;

  const allTodos = await fetchTodosOfUsers(userIdArray, lengthOfUserIdArray, 5);

  const result = [];
  let index = 0;

  for (let chunk of allTodos) {
    for (let userTodo of chunk) {
      const userObject = {};
      userObject["id"] = userIdArray[index];
      userObject["name"] = userName[index];

      const isTrue = userTodo.map((user) => user.isCompleted == true);
      let numTodosCompleted = 0;

      for (let boolean of isTrue) {
        if (boolean == true) {
          numTodosCompleted++;
        }
      }
      userObject["numTodosCompleted"] = numTodosCompleted;

      result.push(userObject);
      index++;
    }
  }

  console.log(result);
}

main();
