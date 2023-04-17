// eslint-disable-next-line import/no-extraneous-dependencies
import { ajax } from 'rxjs/ajax';
import {
	catchError, concatAll, map, of,
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
				return of([]);
			}),
			concatAll(),
			map(async (post) => {
				try {
					const commentsUrl = `${PostsView.url}/posts/${post.id}/comments/latest`;
					const response = await fetch(commentsUrl);
					const json = await response.json();
					post.comments = json.data;
				} catch (e) {
					// eslint-disable-next-line no-console
					console.error(e);
				}
				return post;
			}),
			concatAll(),
		).subscribe((post) => {
			const postContainer = document.createElement('div');
			const postView = new PostView(postContainer, post);
			postView.bindToDOM();
			this.postsContainer.append(postContainer);
			post.comments.forEach((comment) => {
				postView.comments.insertAdjacentHTML(
					'beforeend',
					CommentView.markup(comment),
				);
			});
		});
	}
}
