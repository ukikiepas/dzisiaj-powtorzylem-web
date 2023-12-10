import {Component, EventEmitter, Input, OnInit, Output} from "@angular/core";
import {CommentInterface} from "../../models/commentInterface";
import {ActiveCommentTypeEnum} from "../../models/activeCommentType.enum";
import {ActiveCommentInterface} from "../../models/activeCommentInterface";

@Component({
    selector: 'comment',
    templateUrl: './comment.component.html',
})
export class CommentComponent implements OnInit{

    @Input() currentUsername: string | undefined;
    @Input() comment!: CommentInterface;
    @Input() replies!: CommentInterface[];
    @Input() activeComment!: ActiveCommentInterface | null;
    @Input() parentId: number | null = null;

    @Output() setActiveComment = new EventEmitter<ActiveCommentInterface | null>;

    @Output() addComment = new EventEmitter<{
      text: string;
      parentId: number | null ;
    }>();

    @Output() updateComment = new EventEmitter<{
      text: string;
      commentId: number;
    }>();

    @Output() deleteComment = new EventEmitter<number>();


    canEdit: boolean = false;
    canDelete: boolean = false;
    activeCommentType = ActiveCommentTypeEnum;
    replyId: number | null = null;




    ngOnInit(): void {
      this.canEdit = this.currentUsername === this.comment?.username && this.replies?.length===0;
      this.canDelete = this.currentUsername === this.comment?.username && this.replies?.length===0;
      this.replyId = this.parentId ? this.comment.commentId : null ;
    }

    isReplying(): boolean {
        if(!this.activeComment){
            return false;
        }
        return (
            this.activeComment.id === this.comment?.commentId &&
            this.activeComment.type === this.activeCommentType.replying
        );
    }

    isEditing(): boolean {
        if(!this.activeComment){
            return false;
        }
        return (
            this.activeComment.id === this.comment?.commentId &&
            this.activeComment.type === this.activeCommentType.editing
        );
    }
}
