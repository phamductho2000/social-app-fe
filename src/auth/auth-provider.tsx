import {useEffect} from "react";
// import Keycloak from "keycloak-js";

// const keycloak = new Keycloak({
//   url: 'http://localhost:8180/',
//   realm: 'ecommerce-auth',
//   clientId: 'ecommerce-app',
// });

// @ts-ignore
const AuthProvider = ({children}) => {
  // useEffect(() => {
  //   let refreshInterval: any;
  //
  //   keycloak.init({
  //     onLoad: "login-required",
  //     pkceMethod: "S256",
  //     silentCheckSsoRedirectUri: window.location.origin + '/silent-check-sso.html'
  //   })
  //     .then((authenticated: boolean) => {
  //       console.log('authenticated', authenticated);
  //       if (authenticated) {
  //         localStorage.setItem('token', keycloak.token as string);
  //         keycloak.loadUserInfo().then((userInfo: any) => {
  //           console.log('userInfouserInfo', userInfo); // Lấy thông tin người dùng
  //           localStorage.setItem('preferred_username', userInfo.preferred_username);
  //         });
  //
  //         refreshInterval = setInterval(() => {
  //           keycloak.updateToken(70).then((refreshed) => {
  //             if (refreshed) {
  //               localStorage.setItem('token', keycloak.token as string);
  //               console.log("Token was successfully refreshed");
  //             } else {
  //               console.warn("Token is still valid");
  //             }
  //           }).catch(err => {
  //             console.error("Failed to refresh token", err);
  //           });
  //         }, 60000);
  //
  //       } else {
  //         keycloak.login();
  //       }
  //     })
  //     .catch((e) => {
  //       return console.error;
  //     });
  //
  //   return () => {
  //     if (refreshInterval) clearInterval(refreshInterval);
  //   };
  //
  // }, []);

  return (
    <>{children}</>
  )
}

export default AuthProvider;
