"use strict";

var Form = React.createClass({
	displayName: "Form",

	render: function render() {
		return React.createElement(
			"div",
			{ className: "search-wrap row" },
			React.createElement(
				"div",
				{ className: "col-lg-6" },
				React.createElement(
					"form",
					{ onSubmit: this.handleSubmit },
					React.createElement(
						"div",
						{ className: "input-group" },
						React.createElement("input", { ref: "search", type: "text", className: "form-control", placeholder: "posts, john doe, tags..." }),
						React.createElement(
							"span",
							{ className: "input-group-btn" },
							React.createElement(
								"button",
								{ className: "btn btn-default", type: "button" },
								"Buscar"
							)
						)
					)
				)
			)
		);
	},
	handleSubmit: function handleSubmit(e) {
		e.preventDefault();

		this.props.list.getItemAjax({
			filter: {
				s: this.refs.search.value
			}
		});
	}
});
