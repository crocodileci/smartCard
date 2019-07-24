import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { from } from 'rxjs';

declare var hitrust: any;

@Injectable({
  providedIn: 'root'
})
export class HandShakeServiceService {

  private clientSessionId:string;
  private url = "http://notice.hitrust.com.tw/rest/eATM/";
  private service_challenge = "response/calculate";
  private service_response = "response/verify";
  private service_communicate = "communicate";


  constructor(private http: HttpClient) { }

  // handshake() {
  //   return this.http.post<any>(`${config.apiUrl}/users/authenticate`, { username, password })
  //     .pipe(map(user => {
  //       // login successful if there's a jwt token in the response
  //       if (user && user.token) {
  //         // store user details and jwt token in local storage to keep user logged in between page refreshes
  //         localStorage.setItem('currentUser', JSON.stringify(user));
  //         this.currentUserSubject.next(user);
  //       }

  //       return user;
  //     }));
  // }

  public get communicateServiceName(): string {
    return this.service_communicate;
  }

  public get responseServiceName(): string{
    return this.service_response;
  }

  public get serverURL(): string {
    return this.url;
  }

  public get currentClientSessionId(): string {
    return this.clientSessionId;
  }

  handshake(){
    return from(new Promise((resolve, reject) => {
      hitrust.plugins.e2ee.generateChallenge((challenge) => {
        this.http.post<any>(this.url + this.service_challenge, challenge).subscribe(res => {
          this.clientSessionId = res.clientSessionId;
          let serverResponse = {
            serverChallenge: res.serverChallenge,
            publicKey: res.serverPublicKey,
            serverResponse: res.serverResponse
          }
          hitrust.plugins.e2ee.verifyResponse(serverResponse, (clientResponse) => {

            console.log(clientResponse);

            clientResponse.clientSessionId = this.clientSessionId;

            this.http.post<any>(this.url + this.service_response, clientResponse).subscribe(res => {
              console.log(res);

              if (res == "Challenge Response & synchonize session key complete.") {
                console.log("Handshake done");
                resolve(true);
              }else{
                resolve(false);
              }
            });

          }, reject);

        });
      }, reject);

    }));

  }

  testNormalTelegram(){
    let telegram_101 = {
      userId: "Grady",
      caseId: "123",
      actionId: "456",
      company: "Histrust",
      name: "GradyDun"
    }

    this.http.post<any>(this.url + this.service_communicate, telegram_101).subscribe(res => {

      console.log(res);

    });
  }

  testHandshake() {
    console.log("testHandshake");


    hitrust.plugins.e2ee.generateChallenge((challenge) => {
      this.http.post<any>(this.url + this.service_challenge, challenge).subscribe(res => {
        console.log(res);
        // let body = JSON.parse(res.body);
        // console.log(body);

        this.clientSessionId = res.clientSessionId;

        let serverResponse = {
          serverChallenge: res.serverChallenge,
          publicKey: res.serverPublicKey,
          serverResponse: res.serverResponse
        }

        hitrust.plugins.e2ee.verifyResponse(serverResponse, (clientResponse) => {

          console.log(clientResponse);

          clientResponse.clientSessionId = this.clientSessionId;

          this.http.post<any>(this.url + this.service_response, clientResponse).subscribe(res => {
            console.log(res);

            if (res == "Challenge Response & synchonize session key complete.") {
                console.log("Handshake done");

                let telegram_101 = {
                  userId: "Grady",
                  caseId: "123",
                  actionId: "456",
                  company: "Histrust",
                  name: "GradyDun"
                }

                this.http.post<any>(this.url + this.service_communicate, telegram_101).subscribe(res => {

                  console.log(res);

                });
              }
          });

        }, console.error);

      });
    }, console.error);

  }

}
