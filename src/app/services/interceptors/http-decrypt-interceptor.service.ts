import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpResponse } from '@angular/common/http';
import { Observable, from } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import { HandShakeServiceService } from '../handshake/hand-shake-service.service';

declare var hitrust: any;

@Injectable({
  providedIn: 'root'
})
export class HttpDecryptInterceptorService implements HttpInterceptor {

  constructor(private handshakeService: HandShakeServiceService) { }

  public intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    console.log("HttpDecryptInterceptorService");
    console.log(req);

    return next.handle(req).pipe(
      mergeMap((event) => {   // use mergeMap instead of map
        return new Observable(ob => {                 // return new Observable to retrieve asynchronous data
          if (event instanceof HttpResponse) {
            console.log("before cacheResponseProccess");

            // const val: Observable<HttpEvent<any>> = this.angularCache.cacheResponseProccess(event);

            if (event.url.indexOf(this.handshakeService.communicateServiceName) > 0){
              console.log("body need decrypt");

              var body = event.body;
              console.log("body: ", body);

              if (body.returnCode == 0){
                this.bodyDecrypt(body.communication).subscribe(plainText =>{
                  var decrypted_body = {
                    returnCode: body.returnCode,
                    communication: JSON.parse(<string>plainText),
                    returnMessage: body.returnMessage
                  }

                  event = (<HttpResponse<any>>event).clone({ body: decrypted_body });
                  ob.next(event);
                })
              }else{
                ob.next(event);
              }
            } else if(event.url.indexOf(this.handshakeService.responseServiceName) > 0) {

              /**
               * service verify response
               * body: {answer: base64 cipher string}
               */

              var body = event.body;
              console.log("body: ", body);

              if (body.returnCode == 0) {
                this.bodyDecrypt(body.answer).subscribe(plainText => {
                  var body = plainText;

                  event = (<HttpResponse<any>>event).clone({ body: body });
                  ob.next(event);
                })
              }

            }else{
              ob.next(event);
            }

            // val.subscribe(x => {
            //   console.log('Return modified response is:', x);
            //   ob.next(x);         // return modified result
            // });

          }
        });
      })
    );
  }

  bodyDecrypt(cipher:string){
    return from(new Promise((resolve, reject) => {
      hitrust.plugins.e2ee.sessionKeyDecrypt(cipher, (plainText) => {
        resolve(plainText);
      }, reject);
    }));
  }
}
