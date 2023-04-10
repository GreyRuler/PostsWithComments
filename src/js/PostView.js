import conversionDate from './util/conversionDate';

export default class PostView {
	static get selectorComments() {
		return '.comments-container';
	}

	static markup(post) {
		return `
			<div class="post">
				<header>
					<img src="${post.avatar}" style="background-color: ${post.avatar}"
					 	 alt="Аватарка">
					<div class="title-post">
						<h4 class="author">${post.author}</h4>
						<span class="time-post">${conversionDate(post.created)}</span>
					</div>
				</header>
				<img src="${post.image}" alt="Картинка">
				<footer class="comments-container">
					<h5>Последние комментарии</h5>
				</footer>
			</div>
		`;
	}

	constructor(element, post) {
		this.element = element;
		this.post = post;
	}

	bindToDOM() {
		this.element.innerHTML = PostView.markup(this.post);
		this.comments = this.element.querySelector(PostView.selectorComments);
	}
}
