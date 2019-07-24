import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpResponse } from '@angular/common/http';
import { Observable, from } from 'rxjs';
import { HandShakeServiceService } from '../handshake/hand-shake-service.service';
import { resolve } from 'q';
import { switchMap, map } from 'rxjs/operators';

declare var hitrust:any;

@Injectable({
  providedIn: 'root'
})
export class HttpEncryptInterceptorService implements HttpInterceptor{

  constructor(private handshakeService:HandShakeServiceService) { }

  public intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    if (req.url.indexOf(this.handshakeService.communicateServiceName) > 0){
      console.log("Interceptor encrypt body");
      //加密通道處理

      //取得clientSessionId
      let clientSessionId = this.handshakeService.currentClientSessionId;
      if (clientSessionId){

        console.log(req);

        //取出原始body
        let body = req.body;
        
        let bodyStr = JSON.stringify(body);

        //取得加密電文的observable物件
        const observable = this.bodyEncrypt(bodyStr);

        return observable.pipe(
          switchMap((cipherText) => {
            //取得密文
            console.log(`cipherText: ${cipherText}`);

            //製作新的http body
            let encryptReq = req.clone({
              body: {
                clientSessionId: this.handshakeService.currentClientSessionId,
                communication: cipherText
              },
            });

            return next.handle(encryptReq).pipe(
              map((event: HttpEvent<any>) => {
                if (event instanceof HttpResponse) {
                  console.log("interceptor response");
                  console.log(event);

                  if (event.body.returnCode == 5){
                    console.log("invalid session id");

                    
                  }else{
                    return event;
                  }
                }
              })
            );
          })
        );
      }else{
        //需要handshake後 再重送
      }

      

    }else{
      //非加密通道的處理=> bypass
      console.log(req);
      return next.handle(req);
    }

  }

  bodyEncrypt(plainText:string){

    return from(new Promise((resolve, reject)=>{
      hitrust.plugins.e2ee.sessionKeyEncrypt(plainText, (cipherText) => {
        resolve(cipherText);
      }, reject);
    }));
  }

  handshake(){

  }
}
