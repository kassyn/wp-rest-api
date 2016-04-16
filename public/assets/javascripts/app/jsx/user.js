var User = React.createClass({
    getInitialState: function() {
        return {
            user   : {},
            loaded : false
        };
    },
    componentDidMount: function() {
        $.getJSON( '/rest/?route=users/me', this.setAjaxUser );
    },
    setAjaxUser: function(response) {
        this.setState({
            user   : response,
            loaded : true
        });
    },
    render: function() {
        if ( !this.state.loaded ) {
            return this.renderWaitMode();
        }

        return (
            <div className="starter-template">
                <img src={this.state.user.avatar_urls['96']} width="120" className="img-circle" />
                <h1>
                    {this.state.user.name}
                </h1>
                <p className="lead">
                    {this.state.user.description}
                </p>
            </div>
        );
    },
    renderWaitMode: function() {
        return (
            <div className="starter-template">
                <p>Aguarde...</p>
            </div>
        );
    }
});
