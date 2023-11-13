import {UserDto} from "../models/user.interface";
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject, Observable} from "rxjs";
import {Injectable} from "@angular/core";
import {ChangePasswordRequest} from "../models/password.interface";
import {RoutePaths} from "../../models/route-paths.enum";


@Injectable({
  providedIn: 'root'
})
export class AccountService{

  constructor(private http: HttpClient) {}

  getUserData():Observable<UserDto>{
    return this.http.get<UserDto>(`${RoutePaths.GENERAL_API}/users/get/user`);
  }

  uploadFile(base64image: string):Observable<Object> {
    return this.http.post(`${RoutePaths.GENERAL_API}/users/post/image`, base64image);
  }

  changePassword(changePasswordRequest:ChangePasswordRequest):Observable<Object>{
    return this.http.patch(`${RoutePaths.GENERAL_API}/users/change-password`, changePasswordRequest);
  }

  changeUserDetails(userDto:UserDto):Observable<Object>{
    return this.http.patch(`${RoutePaths.GENERAL_API}/users/change-user-details`, userDto);
  }


}
