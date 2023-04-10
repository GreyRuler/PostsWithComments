import conversionDate from './util/conversionDate';

export default class CommentView {
	static markup(comment) {
		return `
			<div class="comment">
				<img src="${comment.avatar}" alt="Аватарка"
					 style="background-color: ${comment.avatar}">
				<div class="info">
					<div class="title-comment">
						<span class="author">${comment.author}</span>
						<span class="time-comment">
							${conversionDate(comment.created)}
						</span>
					</div>
					<div class="content">${comment.content}</div>
				</div>
			</div>
		`;
	}
}
