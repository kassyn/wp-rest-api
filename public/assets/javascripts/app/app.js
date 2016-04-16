var App = React.createClass({
	displayName: "App",

	render: function () {
		return React.createElement(
			"div",
			null,
			React.createElement(
				"div",
				{ className: "container" },
				React.createElement(User, null)
			),
			React.createElement(
				"div",
				{ className: "container list-news" },
				React.createElement(Features, null)
			)
		);
	}
});
