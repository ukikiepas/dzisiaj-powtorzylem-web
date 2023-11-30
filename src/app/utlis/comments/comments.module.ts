import {NgModule} from "@angular/core";
import {CommentsComponent} from "./components/comments.component";
import {CommentsService} from "./services/comments.service";
import {CommonModule, NgOptimizedImage} from "@angular/common";
import {CommentComponent} from "./components/comment/comment.component";
import {CommentFormComponent} from "./components/commentForm/commentForm.component";
import {ReactiveFormsModule} from "@angular/forms";

@NgModule({
    imports: [CommonModule, NgOptimizedImage, ReactiveFormsModule],
  declarations: [CommentsComponent, CommentComponent, CommentFormComponent],
  exports: [CommentsComponent],
  providers: [CommentsService],
})
export class CommentsModule{}
