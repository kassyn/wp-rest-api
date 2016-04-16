var App = React.createClass({
	render: function() {
		return (
			<div>
				<div className="container">
					<User />
				</div>
				<div className="container list-news">					
					<Features />
				</div>
			</div>
		);
	}
});
