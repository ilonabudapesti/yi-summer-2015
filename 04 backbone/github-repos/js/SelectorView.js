window.SelectorView = Backbone.View.extend({

  initialize: function(){
    this.render()
  },

  events: {
    // Set up an event listener to call `pullRepos` when the form is submitted
    'submit form': 'pullRepos'
  },

  pullRepos: function(e){
    e.preventDefault();
    var values = _.pluck($(e.target).serializeArray(), 'value');
    // e.target targets the whole form.
    // serializeArray returns an array of objects where 
    // each object has a property for the field name and its value.
    // pluck then plucks out the value
    // in short, we were able to get the user's input in 1 line of code. nice :)
    // values[1] will be either "orgs" or "users" from our radio button
    // values[0] will be the github handle that the user typed in
    $.get(['https://api.github.com', values[1], values[0], 'repos'].join('/'), function(data){
      this.collection.set(data);
      // You'll need to listen for this event in your ReposView
      this.collection.trigger('rerender');
    }.bind(this));
  },

  render: function(){
    this.$el.html(" \
      <form name=\"form\"> \
        Handle: \
          <input type=\"text\" name=\"github.handle\" /> \
        Type: \
          <input type=\"radio\" name=\"github.type\" value=\"users\" /> User \
          <input type=\"radio\" name=\"github.type\" value=\"orgs\" /> Organization \
        <button>Load repositories</button> \
      </form>");
  }

});