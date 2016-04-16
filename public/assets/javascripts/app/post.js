var Post = React.createClass({
	displayName: "Post",

	componentWillMount: function () {
		this.post = this.props.post;
	},
	render: function () {
		return React.createElement(
			"div",
			{ className: "col-lg-3" },
			React.createElement(
				"div",
				{ className: "thumbnail" },
				this.getImage(),
				React.createElement(
					"div",
					{ className: "caption" },
					React.createElement(
						"h3",
						null,
						this.post.title.rendered
					),
					React.createElement("p", { dangerouslySetInnerHTML: this.getExcerpt() })
				)
			)
		);
	},
	getExcerpt: function () {
		return { __html: this.post.excerpt.rendered };
	},
	getImage: function () {
		if (!this.post.thumbnail) {
			return;
		}

		return React.createElement("img", { src: this.post.thumbnail, alt: this.post.title.rendered });
	}
});
