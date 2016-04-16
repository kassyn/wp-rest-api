var Form = React.createClass({
	render: function() {
		return (
			<div className="search-wrap row">
				<div className="col-lg-6">
					<form onSubmit={this.handleSubmit}>
						<div className="input-group">
							<input ref="search" type="text" className="form-control" placeholder="posts, john doe, tags..." />
							<span className="input-group-btn">
								<button className="btn btn-default" type="button">Buscar</button>
							</span>
						</div>
					</form>
				</div>
			</div>
		);
	},
	handleSubmit: function(e) {
        e.preventDefault();

        this.props.list.getItemAjax({
            filter: {
                s: this.refs.search.value
            }
        });
    }
});
