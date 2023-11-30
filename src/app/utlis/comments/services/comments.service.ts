import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {CommentInterface} from "../models/commentInterface";
import { RoutePaths } from "src/app/models/route-paths.enum";
import {AuthenticationService} from "../../../auth/services/authentication.service";


@Injectable()
export class CommentsService {
  constructor(
    private httpClient: HttpClient,
    private authenticationService :AuthenticationService) {}



  getComments(): Observable<CommentInterface[]>{
    return this.httpClient.get<CommentInterface[]>(`${RoutePaths.GENERAL_API}/comments`);
  }

  addNewComment(text: string, parentId: number | null): Observable<CommentInterface>{
    return this.httpClient.post<CommentInterface>(
        `${RoutePaths.GENERAL_API}/comments`,
        {
          body: text,
            parentId,
        })
  }


}
