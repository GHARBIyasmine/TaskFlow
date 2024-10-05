// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
    production: false,
    firebaseConfig: {
      apiKey: "AIzaSyDrntHSbZulMA9DvUAyzjgidsDmdVj6HUw",
      authDomain: "my-angular-project-3a256.firebaseapp.com",
      projectId: "my-angular-project-3a256",
      storageBucket: "my-angular-project-3a256.appspot.com",
      messagingSenderId: "605554701887",
      appId: "1:605554701887:web:76c7e3fb5c75cdd47bea8a",
      measurementId: "G-VPK4D4M6EP"
    }
  };
  
  export const conf = {  
    Backend_API : 'http://localhost:8000',
    ACCESS_TOKEN_KEY: 'RT4_Project_KEY',
    REFRESH_TOKEN_KEY: 'Refresh_KEY'
  }; 

  /*
   * For easier debugging in development mode, you can import the following file
   * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
   *
   * This import should be commented out in production mode because it will have a negative impact
   * on performance if an error is thrown.
   */
  import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
  