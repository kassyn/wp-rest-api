'use strict';

var User = React.createClass({
    displayName: 'User',

    getInitialState: function getInitialState() {
        return {
            user: {},
            loaded: false
        };
    },
    componentDidMount: function componentDidMount() {
        $.getJSON('/rest/?route=users/me', this.setAjaxUser);
    },
    setAjaxUser: function setAjaxUser(response) {
        this.setState({
            user: response,
            loaded: true
        });
    },
    render: function render() {
        if (!this.state.loaded) {
            return this.renderWaitMode();
        }

        return React.createElement(
            'div',
            { className: 'starter-template' },
            React.createElement('img', { src: this.state.user.avatar_urls['96'], width: '120', className: 'img-circle' }),
            React.createElement(
                'h1',
                null,
                this.state.user.name
            ),
            React.createElement(
                'p',
                { className: 'lead' },
                this.state.user.description
            )
        );
    },
    renderWaitMode: function renderWaitMode() {
        return React.createElement(
            'div',
            { className: 'starter-template' },
            React.createElement(
                'p',
                null,
                'Aguarde...'
            )
        );
    }
});
