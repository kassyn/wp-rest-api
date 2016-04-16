var Post = React.createClass({
    componentWillMount: function() {
      this.post = this.props.post;
    },
    render: function() {
        return (
			<div className="col-lg-3">
				<div className="thumbnail">
					{this.getImage()}
					<div className="caption">
						<h3>{this.post.title.rendered}</h3>
						<p dangerouslySetInnerHTML={this.getExcerpt()}/>
					</div>
				</div>
			</div>
        );
    },
    getExcerpt: function() {
		return { __html: this.post.excerpt.rendered };
    },
	getImage: function() {
		if ( !this.post.thumbnail ) {
			return;
		}

		return <img src={this.post.thumbnail} alt={this.post.title.rendered}/>
	}
});
