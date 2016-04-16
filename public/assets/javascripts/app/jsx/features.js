var Features = React.createClass({
    getInitialState: function() {
      return {
          items  : [],
          loaded : false
      };
    },
    render: function() {
        var rows = [];

        if ( !this.state.loaded ) {
            return this.renderWaitMode();
        }

        this.state.items.forEach(function(item) {
            rows.push( <Post post={item} key={item.id} /> );
        });

        return (
            <div>
                <Form list={this}/>
                <div className='row'>{rows}</div>
            </div>
        );
    },
    componentDidMount: function() {
        this.getItemAjax();
    },
    getItemAjax: function(params) {
        params = $.extend({
            route : 'posts'
        }, params || {} );

        var ajax = $.ajax({
            url      : '/rest',
            dataType : 'json',
            data     : params
        });

        ajax.done( this.setAjaxItems );
    },
    setAjaxItems: function(response) {
        this.setState({
            items  : response,
            loaded : true,
        });
    },
    renderWaitMode: function() {
        return (
            <p>Aguarde...</p>
        );
    }
});
