import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { HandShakeServiceService } from '../handshake/hand-shake-service.service';

@Injectable({
  providedIn: 'root'
})
export class FakeInterceptorService implements HttpInterceptor{

  constructor(private handshakeService: HandShakeServiceService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (!req.url.includes(this.handshakeService.fakeURL)) {
      return next.handle(req);
    }
    console.warn("FakeInterceptor");

    return of(new HttpResponse({ status: 200, body: req.body }));
  }
}
