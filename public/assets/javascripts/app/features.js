'use strict';

var Features = React.createClass({
    displayName: 'Features',

    getInitialState: function getInitialState() {
        return {
            items: [],
            loaded: false
        };
    },
    render: function render() {
        var rows = [];

        if (!this.state.loaded) {
            return this.renderWaitMode();
        }

        this.state.items.forEach(function (item) {
            rows.push(React.createElement(Post, { post: item, key: item.id }));
        });

        return React.createElement(
            'div',
            null,
            React.createElement(Form, { list: this }),
            React.createElement(
                'div',
                { className: 'row' },
                rows
            )
        );
    },
    componentDidMount: function componentDidMount() {
        this.getItemAjax();
    },
    getItemAjax: function getItemAjax(params) {
        params = $.extend({
            route: 'posts'
        }, params || {});

        var ajax = $.ajax({
            url: '/rest',
            dataType: 'json',
            data: params
        });

        ajax.done(this.setAjaxItems);
    },
    setAjaxItems: function setAjaxItems(response) {
        this.setState({
            items: response,
            loaded: true
        });
    },
    renderWaitMode: function renderWaitMode() {
        return React.createElement(
            'p',
            null,
            'Aguarde...'
        );
    }
});
