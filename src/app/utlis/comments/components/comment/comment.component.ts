import {Component, EventEmitter, Input, OnInit, Output} from "@angular/core";
import {CommentInterface} from "../../models/commentInterface";
import {ActiveCommentTypeEnum} from "../../models/activeCommentType.enum";
import {ActiveCommentInterface} from "../../models/activeCommentInterface";

@Component({
    selector: 'comment',
    templateUrl: './comment.component.html',
})
export class CommentComponent implements OnInit{

    canEdit: boolean = false;
    canDelete: boolean = false;
    activeCommentType = ActiveCommentTypeEnum;
    replyId: number | null= null;

    @Input() username: string | undefined;
    @Input() comment!: CommentInterface;
    @Input() replies!: CommentInterface[];
    @Input() activeComment!: ActiveCommentInterface | null;
    @Input() parentId: number | null = null;

    @Output() setActiveComment = new EventEmitter<ActiveCommentInterface | null>;
    @Output() addComment = new EventEmitter<{
        text: string;
        parentId: number | null ;
    }>();

    ngOnInit(): void {
      this.canEdit = this.username === this.comment?.username && this.replies?.length===0;
      this.canDelete = this.username === this.comment?.username && this.replies?.length===0;
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

    setReplyActiveComment(): void {
       console.log(this.comment + "XDDD" + this.comment.commentId)
        if (this.comment && this.comment.commentId !== undefined) {
            this.setActiveComment.emit({
                id: this.comment.commentId,
                type: this.activeCommentType.replying
            });
        }
    }

    setEditActiveComment(): void {
        if (this.comment && this.comment.commentId !== undefined) {
            this.setActiveComment.emit({
                id: this.comment.commentId,
                type: this.activeCommentType.editing
            });
        }
    }

}
