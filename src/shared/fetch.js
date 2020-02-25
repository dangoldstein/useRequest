import axios from "axios";
export const API = "https://hn.algolia.com/api/v3";

// export class http {
//   get(query, timeout = null) {
//     const url = `${API}/search?query=${query}`;

//     return new Promise((resolve, reject) => {
//       axios
//         .get(url)
//         .then(resolve)
//         .catch(reject);

//       if (timeout) {
//         setTimeout(() => resolve({ success: false, timeout: true }), timeout);
//       }
//     });
//   }
// }

export const fetch = async (url, timeout = null) => {
  return new Promise((resolve, reject) => {
    axios
      .get(url)
      .then(resolve)
      .catch(err => resolve({ success: false, error: err }));

    if (timeout) {
      setTimeout(() => resolve({ success: false, timeout: true }), timeout);
    }
  });
};
