window.ReposView = Backbone.View.extend({

  tagName: 'ul',

  className: 'repos',

  initialize: function(options){
    this.collection = options.collection
    // listener to rerender the view when repos updates
    this.collection.on('rerender', this.render, this);
  },

  render: function(){
    this.$el.empty();

    // Repaint the list of tasks by mapping over this.collection
    this.$el.append( this.collection.map(function(repo){
      return new RepoView({model: repo}).render();
    }) );
  },

});
