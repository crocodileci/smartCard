import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpResponse, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HandShakeServiceService } from '../handshake/hand-shake-service.service';
import { mergeMap, switchMap } from 'rxjs/operators';
import { HttpEncryptInterceptorService } from './handshake-interceptor.service';

@Injectable({
  providedIn: 'root'
})
export class HttpErrorInterceptorService implements HttpInterceptor {

  constructor(private handshakeService: HandShakeServiceService, private httpEncryptInterceptorService: HttpEncryptInterceptorService) { }

  public intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    console.log("HttpErrorInterceptorService");
    console.log(req);

    return next.handle(req).pipe(
      mergeMap((event) => {   // use mergeMap instead of map
        return new Observable(ob => {                 // return new Observable to retrieve asynchronous data
          if (event instanceof HttpResponse) {
            console.log("HttpErrorInterceptor response handle");
            // const val: Observable<HttpEvent<any>> = this.angularCache.cacheResponseProccess(event);

            if (event.url.indexOf(this.handshakeService.communicateServiceName) > 0) {
              var body = event.body;
              console.log("body: ", body);

              if (body.returnCode && body.returnCode != 0) {
                console.log("communicate error");
                  this.handshakeService.handshake().subscribe(isHandShakeSuccess => {
                    next.handle(req).subscribe((response)=>{
                      ob.next(response);
                    })
                  })
              }else{
                ob.next(event);
              }
            } else {
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
}
