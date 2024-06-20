import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ToastrService} from "ngx-toastr";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class EmailService {

  constructor(private http: HttpClient, private toastr: ToastrService) {}

  sendEmail(body: any): Observable<any>{
    return this.http.post(`https://hrvdqsuk3dllrtk5xzdipmry7y0mqrst.lambda-url.eu-north-1.on.aws/email`, body)
  }
}
