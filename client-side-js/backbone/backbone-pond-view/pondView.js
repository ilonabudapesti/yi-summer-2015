var PondView = Backbone.View.extend({
/*
  tagName: 'table',

  render: function(){

    var $table = this.$el;

    this.collection.each(function(){
      var fishView = new FishView({model: model});
      $table.append(fishView.render());
    });

    return this.$el;
  }*/


	/* Fill out your solution here */
  tagName: 'table',
  /*START SOLUTION*/
  fishTemplate: _.template('<tr><td><%= name %></td><td><img src="<%=image%>"></td></tr>'),
  render: function() {
    var self = this;
    self.$el.html('');
    self.collection.each(function(fish) {
      self.$el.append(self.fishTemplate(fish.attributes));
    });
    $('body').append(this.$el);
    return this;
  },
  initialize: function() {
    this.render();
    this.collection.on('change:name', this.render, this);
  }
  /*END SOLUTION*/
});
