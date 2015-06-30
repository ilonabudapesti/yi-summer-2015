(function() {

  'use strict';

  angular
    .module('formlyApp')
    .controller('MainController', MainController);

  function MainController() {
    var vm = this;

    vm.rental = {};

    vm.rentalFields = [
      {
        key: 'first_name',
        type: 'input',
        templateOptions: {
          type: 'text',
          label: 'First Name',
          placeholder: 'What your mother calls you',
          required: true
        }
      },
      {
        key: 'last_name',
        type: 'input',
        templateOptions: {
          type: 'text',
          label: 'Last Name',
          placeholder: 'Your secret agent name',
          required: true
        }
      },
      {
        key: 'email',
        type: 'input',
        templateOptions: {
          type: 'email',
          label: 'Email address',
          placeholder: 'Enter email',
          required: true
        }
      }
    ];
  }

})();
