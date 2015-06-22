window.Repo = Backbone.Model.extend({

  details: function(){
    return {
      name: this.get('name'),
      description: this.get('description'),
      stargazers_count: this.get('stargazers_count')
    };
  }
});
