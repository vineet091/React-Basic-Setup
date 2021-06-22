import fetch from 'isomorphic-fetch';


const apiService = async (url, options) => {
    const optionsObj = {
        method: options.method,
        body: JSON.stringify(options.data),
        headers: {
          "Content-Type": "application/json",
        }
      };
    const response = await fetch(url, optionsObj);
    const json = await response.json();
     if(response.ok) {
         return json;
     } else {
         return Promise.reject({ success: false });
     }

}



export default apiService;