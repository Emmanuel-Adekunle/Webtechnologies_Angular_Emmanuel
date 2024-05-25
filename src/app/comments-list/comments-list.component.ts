import { Component, OnInit } from '@angular/core';
import { Comment } from './commentSchema';
import { CommentService } from '../comment.service';
import { animView } from '../animations/transitions.animation'; // Anim file

@Component({
  selector: 'app-comments-list',
  templateUrl: './comments-list.component.html',
  styleUrls: ['./comments-list.component.css'],
  animations: [animView] // add our animations
})
export class CommentsListComponent implements OnInit {
  comments: Comment[] = [];
  comment: Comment = new Comment();

  showSpinner: boolean = true;
  showComments: boolean = false;

  constructor(private commentService: CommentService) {}

  ngOnInit(): void {
    this.getComments();
  }

  sortByRecent(): void {
    this.comments.sort((a, b) => b.timestamp - a.timestamp);
  }

  sortByLikes(): void {
    this.comments.sort((a, b) => b.likes - a.likes);
  }

  getComments(): void {
    this.commentService.getComments().subscribe(comments => {
      this.comments = comments;
      this.updateElapsedTimes();
      this.sortByRecent();
      this.showCommentsList(true);
    });
  }

  updateElapsedTimes(): void {
    this.comments.forEach(comment => {
      const t = new Date(comment.timestamp);
      const daysElapsed = Math.floor((Date.now() - t.getTime()) / (1000 * 60 * 60 * 24));
      const monthsElapsed = Math.floor(daysElapsed / 30);
      if (monthsElapsed < 1) {
        comment.elapsed = daysElapsed <= 0 ? 'less than a day ago' : `${daysElapsed} days ago`;
      } else {
        comment.elapsed = `${monthsElapsed} months ago`;
      }
    });
  }

  showCommentsList(show: boolean): void {
    this.showComments = show;
    this.showSpinner = !show;
  }

  clearComment(): void {
    this.comment.comment = '';
  }

  addComment(): void {
    this.save();
    this.clearComment();
  }

  private save(): void {
    this.commentService.addComment(this.comment).subscribe(() => {
      this.showCommentsList(false);
      this.getComments();
    });
  }

  updateComment(id: string): void {
    const index = this.comments.findIndex(comment => comment._id === id);
    if (index >= 0) {
      this.commentService.updateComment(this.comments[index]).subscribe(result => {
        this.comments[index].likes = result.likes;
      });
    }
  }

  removeComment(id: string): void {
    this.commentService.deleteComment(id).subscribe(result => {
      if (result.n === 1) {
        console.log("Comment Deleted Successfully!");
        this.showCommentsList(false);
        this.getComments();
      }
    });
  }
}
