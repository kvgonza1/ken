import {Post} from "./post.model"
import {Injectable} from "@angular/core";
import {Subject} from "rxjs";
import {HttpClient} from "@angular/common/http";

@Injectable({providedIn: 'root'})
export class PostService {
  private posts: Post[] = [];
  private postUpdated = new Subject<Post[]>();

  constructor(private http: HttpClient) {
  }


  getPost() {
    // return this.posts;  //by reference
    // return [...this.posts];  //copy of the list of post
    this.http.get<{success: boolean, data: Post[]}>('http://localhost:3000/api/posts')
      .subscribe( (postData)=>{
        this.posts = postData.data;
        this.postUpdated.next([...this.posts]);
      });
  }

  getPostUpdateListener(){
    return this.postUpdated.asObservable();
  }

  addPost(title: String, content: String) {
    const post: Post = {id:'',title: title, content:content}

    this.http.post<{data: String}>('http://localhost:3000/api/posts', post)
      .subscribe((res)=>{
        console.log(res.data);
        this.posts.push(post);
        this.postUpdated.next([...this.posts]);
      });

  }

}
