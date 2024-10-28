import {Component, OnInit} from '@angular/core';
import {NgForm} from "@angular/forms";
import {PostService} from "../post.service";
import {ActivatedRoute, ParamMap} from "@angular/router";
import {Post} from "../post.model";

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css']
})
export class PostCreateComponent implements OnInit {
  post: Post = {id: '', title: '', content: ''};
  private mode: string = 'create';
  private postId: string = '';

  constructor(public postService: PostService, public route: ActivatedRoute) {
  }

  ngOnInit() {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('postId')) {
        console.log('edit');
        this.mode = 'edit';
        this.postId = <string>paramMap.get('postId');
        this.postService.getPostById(this.postId).subscribe(post => {
          this.post = {id: post._id, title: post.title, content: post.content};
        });
      } else {
        this.mode = 'create';
        this.postId = '';
      }
    });
  }

  onAddPost(form: NgForm) {
    if (form.invalid) {
      return;
    }
    if (this.mode === 'create') {
      this.postService.addPost(form.value.title, form.value.content);
      form.resetForm()
    } else{
      this.postService.updatePost(this.postId, form.value.title, form.value.content);
    }
  }
}
