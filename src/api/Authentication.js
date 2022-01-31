import axios from "axios";
const OAuth2 = 'Basic '+btoa('admin:district');
export const  registerNewUsers = async () => {
        try {
          let data = {
               "name": "OAuth2 Client",
                "cid": "demo2",
               "secret": "1e6db50c-0fee-11e5-98d0-3c15c2c6caf6",
               "grantTypes": ["password", "refresh_token", "authorization_code"],
               "redirectUris": ["http://www.example.org"]
          };
          let headers = {
            headers: {
                'Authorization': OAuth2,
                'Content-type': 'application/json',
                'Accept': 'application/json',
            }
          }
          await axios
          .post("https://play.dhis2.org/2.37.2/api/oAuth2Clients", data, headers)
          .then((response) => {
            console.log("response", response);
            if(response) {
              // console.log(response)
            } else {
    
            }
          });
        } catch(err) {
          // here we are receiving validation errors
          console.log("Err == ", err.response);
          console.log(err.response.data.errors);
        }
    }
const OAuth = 'Basic '+btoa('demo:1e6db50c-0fee-11e5-98d0-3c15c2c6caf6');

const headers = new Headers({
    'Authorization': OAuth,
    'Content-type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    Accept: 'application/json',
});
let reqdata = "grant_type=password&username=admin&password=district"


    export const  registerNewUser = () => {
      const data = fetch(`https://play.dhis2.org/dev/uaa/oauth/token`, {
          method: 'POST',
          credentials: 'include',
          mode: 'cors',
          headers,
          body: reqdata,
      });
      console.log(data);
  };
