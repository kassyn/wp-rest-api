class App extends React.Component {
	constructor(props) {
		super( props );

		this.state = {
			loaged: false
		}
	}

	render() {
		console.log( this.state );

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
}
