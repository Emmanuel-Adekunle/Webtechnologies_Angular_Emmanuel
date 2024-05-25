import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Comment } from './comments-list/commentSchema';

@Injectable({
  providedIn: 'root'
})
export class CommentService {
  private commentsUrl: string;

  constructor(private http: HttpClient) {
    this.commentsUrl = this.checkUrl() + 'api/comments';
  }

  private checkUrl(): string {
    const url = window.location.hostname;
    return url.includes('localhost') ? 'http://localhost:8080/' : 'https://example-mongo-comments.herokuapp.com/';
  }

  getComments(): Observable<Comment[]> {
    return this.http.get<Comment[]>(this.commentsUrl);
  }

  getComment(id: string): Observable<Comment> {
    const url = `${this.commentsUrl}/${id}`;
    return this.http.get<Comment>(url);
  }

  addComment(comment: Comment): Observable<Comment> {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    return this.http.post<Comment>(this.commentsUrl, comment, httpOptions);
  }

  deleteComment(id: string): Observable<any> {
    const url = `${this.commentsUrl}/${id}`;
    return this.http.delete<Comment>(url);
  }

  updateComment(comment: Comment): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    return this.http.put(this.commentsUrl, comment, httpOptions);
  }
}
