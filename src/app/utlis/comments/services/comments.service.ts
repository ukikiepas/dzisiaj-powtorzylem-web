import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {CommentInterface} from "../models/commentInterface";
import { RoutePaths } from "src/app/models/route-paths.enum";
import {AuthenticationService} from "../../../auth/services/authentication.service";


@Injectable()
export class CommentsService {
  constructor(
    private httpClient: HttpClient,
    private authenticationService :AuthenticationService) {}



  getComments(section: string, sectionParticularId: number): Observable<CommentInterface[]>{
    return this.httpClient.get<CommentInterface[]>(`${RoutePaths.GENERAL_API}/comments/${section}/${sectionParticularId}`);
  }

  addNewComment(text: string, parentId: number | null, section: string): Observable<CommentInterface>{
    return this.httpClient.post<CommentInterface>(
        `${RoutePaths.GENERAL_API}/comments`,
        {
          body: text,
            parentId,
            section
        })
  }

  updateComment(id: number, text: string): Observable<CommentInterface>{
      return this.httpClient.patch<CommentInterface>(
          `${RoutePaths.GENERAL_API}/comments/${id}`,
        text,
        {
          headers: new HttpHeaders({ 'Content-Type': 'text/plain' })
        })
  }

  deleteComment(id: number): Observable<{}>{
  return this.httpClient.delete<CommentInterface>(
    `${RoutePaths.GENERAL_API}/comments/${id}`)
  }
}
