// eslint-disable-next-line import/no-extraneous-dependencies
import { ajax } from 'rxjs/ajax';
import {
	catchError,
	concatAll,
	map,
	of,
} from 'rxjs';
import PostView from './PostView';
import CommentView from './CommentView';

export default class PostsView {
	static get url() {
		return 'https://posts-vgnn.onrender.com';
	}

	static get markup() {
		return `
			<div class="posts-container"></div>
		`;
	}

	constructor(element) {
		this.element = element;
	}

	render() {
		this.element.innerHTML = PostsView.markup;
		this.postsContainer = this.element.querySelector('.posts-container');
		this.getPosts();
	}

	// eslint-disable-next-line class-methods-use-this
	getPosts() {
		const postUrl = `${PostsView.url}/posts/latest`;
		ajax.getJSON(postUrl).pipe(
			map((response) => response.data),
			catchError((error) => {
				// eslint-disable-next-line no-console
				console.error('error: ', error);
				return of(error);
			}),
			concatAll(),
		).subscribe((post) => {
			const postContainer = document.createElement('div');
			const postView = new PostView(postContainer, post);
			postView.bindToDOM();
			this.postsContainer.append(postContainer);
			const commentsUrl = `${PostsView.url}/posts/${post.id}/comments/latest`;
			ajax.getJSON(commentsUrl).pipe(
				map((response) => response.data),
				catchError((error) => {
					// eslint-disable-next-line no-console
					console.error('error: ', error);
					return of(error);
				}),
			).subscribe((comments) => {
				comments.forEach((comment) => {
					postView.comments.insertAdjacentHTML(
						'beforeend',
						CommentView.markup(comment),
					);
				});
			});
		});
	}
}
