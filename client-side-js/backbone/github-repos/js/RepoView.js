window.RepoView = Backbone.View.extend({

  template: _.template(" \
    <li> \
      <div class=\"repo\"> \
        <span class=\"repo-name\"> \
          <%= name %> \
        </span> \
        <span class=\"repo-description\"> \
          <%= description %> \
        </span> \
        <span class=\"repo-stargazers-count\"> \
          <%= stargazers_count %> \
        </span> \
      </div> \
    </li> \
  "),

  render: function(){
    
    return this.$el.html( this.template(this.model.details()) );
  }

});
