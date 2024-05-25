// Comment schema
export class Comment {
    _id: string;
    name: string;
    comment: string;
    timestamp: number;
    elapsed: string;
    avatar: string;
    likes: number;
  
    constructor() {
      this._id = '';
      this.name = '';
      this.comment = '';
      this.timestamp = Date.now(); // Initialize with current timestamp
      this.elapsed = 'less than a month ago'; // Default value
      this.avatar = '';
      this.likes = 0; // Initialize with 0 likes
    }
  }
  