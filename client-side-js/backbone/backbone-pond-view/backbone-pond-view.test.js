var should = require('should');

describe('Backbone pond-view', function() {
  it('should have jQuery available', function(){
    // did you forget to include jquery.js in index.html?
    should.exist($);
  });
  it('should have underscore available', function(){
    // did you forget to include underscore.js in index.html?
    should.exist(_);
  });
  it('should have Backbone available', function(){
    // did you forget to include Backbone.js in index.html?
    should.exist(Backbone);
  });
  it('should create a table element', function() {
    $('table').length.should.not.eql(0);
  });
  it('should create a tr element', function() {
    $('tr').length.should.not.eql(0);
  });
  it('should create 3 tr elements total', function() {
    $('tr').length.should.eql(3);
  });
  it('should create img tags for each fish', function() {
    $('img').length.should.eql(3);
  });
  it('should update name property of a fish on the dom when it changes', function() {
    //Here, we're grabbing the Goldfish's model, and then changing it's name.
    //This should trigger an event that re-renders the dom to reflect the new name
    var goldfish = myPond.findWhere({name: 'Goldfish'});
    goldfish.set({name: 'Goldie'});
    var allFishes = $('td');

    //This searches all td elements and sees if any of them contain our new name.
    //This should return true if the event bindings were working properly.
    allFishes.filter(function(index) {
      return $(this).text() === 'Goldie';
    }).length.should.eql(1);
  });
  it('should still only have 3 fishes after it re-renders', function() {
    //This is counting the number of rows. Because it happens after the update test,
    //it would potentially have 6 rows if the previous items weren't getting cleared.
    //How can you clear out old html content of an element?
    $('tr').length.should.eql(3);
  });
});
