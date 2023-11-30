import {Component, OnInit} from "@angular/core";
import {CommentsService} from "../services/comments.service";
import {CommentInterface} from "../models/commentInterface";
import {AuthenticationService} from "../../../auth/services/authentication.service";
import {ActiveCommentInterface} from "../models/activeCommentInterface";

@Component({
  selector: 'comments',
  templateUrl: './comments.component.html',
})
export class CommentsComponent implements OnInit{
  currentUsername!: string | undefined;

  comments: CommentInterface[] = [];
  activeComment: ActiveCommentInterface | null = null;

  constructor(private commentsService: CommentsService, private authenticationService:AuthenticationService) {}

  ngOnInit(): void {
    this.commentsService.getComments().subscribe(comments =>{
      this.comments = comments;
    })
  }


  addComment({text, parentId}: {text: string, parentId: number | null}): void{
    console.log("TEST ID PARENTA"+ parentId);
    this.commentsService.addNewComment(text, parentId).subscribe(createdComment => {
      this.comments = [...this.comments, createdComment];
      this.activeComment = null;
    });
  }

  getReplies(commentId: number): CommentInterface[]{
    return this.comments
      .filter((comment) => comment.parentId === commentId)
      .sort(
        (a,b) =>
          new Date(a.createdAt).getMilliseconds() -
          new Date(b.createdAt).getMilliseconds()
      );
  }


  setActiveComment(activeComment: ActiveCommentInterface | null):void {
    this.activeComment = activeComment;
  }
}
