var FishView = Backbone.View.extend({
  
  template: _.template('<tr><td><%= name %></td><td><img src="<%=image%>"></td></tr>'),
  
  initialize: function(){
    this.model.on('change:name', this.render, this);
  },
  
  render: function(){
    this.$el.html(this.template(this.model.attributes));
    return this.$el;
  }
});