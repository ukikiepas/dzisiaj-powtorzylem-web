import {ChangeDetectorRef, Component, Input, OnInit} from "@angular/core";
import {CommentsService} from "../services/comments.service";
import {CommentInterface} from "../models/commentInterface";
import {AuthenticationService} from "../../../auth/services/authentication.service";
import {ActiveCommentInterface} from "../models/activeCommentInterface";

@Component({
  selector: 'comments',
  templateUrl: './comments.component.html',
})
export class CommentsComponent implements OnInit{
  @Input() currentUsername!: string | undefined;
  @Input() section!: string;


  comments: CommentInterface[] = [];
  activeComment: ActiveCommentInterface | null = null;
  showAllComments: boolean = false;
  maxCommentsToShow: number = 3;

  constructor(private commentsService: CommentsService,
              private authenticationService:AuthenticationService,
              private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.commentsService.getComments(this.section, 2).subscribe(comments => {
      this.comments = comments.sort(
        (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
      this.currentUsername = this.authenticationService.getUsernameFromToken();
    });
  }

  addComment({ text, parentId }: { text: string, parentId: number | null }): void {
    this.commentsService.addNewComment(text, parentId, this.section).subscribe(createdComment => {
      if (createdComment) {
        this.comments = [...this.comments, createdComment];
        this.cdr.detectChanges(); // Wywołaj wykrywanie zmian
      } else {
        console.error('Nie udało się dodać komentarza.');
      }
      this.activeComment = null;
    });
  }

  updateComment({text, commentId}: {text: string, commentId: number}): void {
    this.commentsService.updateComment(commentId, text).subscribe(updatedComment => {
      // Znajdź i zaktualizuj odpowiedni komentarz
      this.comments = this.comments.map(comment =>
        comment.commentId === commentId ? {...comment, body: text} : comment
      );
      this.activeComment = null;
      this.cdr.detectChanges();
    });
  }


  deleteComment(commentId: number): void {
    this.commentsService.deleteComment(commentId).subscribe(() => {
      this.comments = this.comments.filter(
        (comment) => comment.commentId !== commentId
      );
      this.activeComment = null;
    });
    this.cdr.detectChanges();
  }


  getReplies(commentId: number): CommentInterface[]{
    return this.comments
      .filter((comment) => comment && comment.parentId === commentId)
      .sort(
        (a,b) =>
          new Date(a.createdAt).getMilliseconds() -
          new Date(b.createdAt).getMilliseconds()
      );
  }


  setActiveComment(activeComment: ActiveCommentInterface | null):void {
    this.activeComment = activeComment;
  }

  toggleCommentsVisibility(): void {
    this.showAllComments = !this.showAllComments;
  }
}
