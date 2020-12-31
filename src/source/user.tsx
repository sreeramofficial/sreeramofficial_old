import React, { useState, useEffect } from 'react';

// const fakeUser = {
//   name: "Sreeram Padmanabhan",
//   age: "32",
//   address: "123, Charming Avenue"
// };

// const fetch = url => Promise.resolve({
//   json: () => Promise.resolve(fakeUser),
// });

// const fetch = url => new Promise((resolve, reject) => {
//   resolve({
//     json: () => new Promise((resolve, reject) => {
//       resolve(fakeUser);
//     })
//   })
// });

export default function User() {
  const [ user, setUser ] = useState(null);

  useEffect(() => {
    (async function fetchUserData() {
      const response = await fetch('https://jsonplaceholder.typicode.com/todos/1');
      setUser(await response.json());
    })();
  }, []);

  if (!user) {
    return "loading...";
  }

  return (
    <pre>
      {JSON.stringify(user)}
    </pre>
  );
}
