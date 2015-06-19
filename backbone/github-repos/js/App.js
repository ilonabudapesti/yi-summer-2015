window.repos = new Repos();

// We're passing the same collection to both views, 
// so we can communicate through its events
// 
new SelectorView({collection: repos}).$el.appendTo('body');
new ReposView({collection: repos}).$el.appendTo('body');
