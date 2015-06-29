// Refactor `makePhone` and `makeSmartPhone`
// They should have all the same methods as the objects returned from the maker 
// functions ie., you should be able to use 
// your new functions like so to create new phone instances.
//
//   var myPhone = new Phone();
//   var mySmartPhone = new SmartPhone();
//

// DO NOT MODIFY FUNCTIONS 'makePhone' AND 'makeSmartPhone'
// USE THE CONSTRUCTOR FUNCTIONS LOCATED AT THE END OF THIS FILE

var makePhone = function(phoneNumber){
  var result = {};
  result.phoneNumber = phoneNumber;
  result.send = function(recipientPhoneNumber, message){
    return 'sending the message "'+ message +'" to the phone number ' + recipientPhoneNumber;
  };
  return result;
};

var makeSmartPhone = function(phoneNumber, email){
  var result = makePhone(phoneNumber);
  result.email = email;
  var oldSend = result.send;
  result.send = function(recipientPhoneNumberOrEmail, message){
    if(typeof recipientPhoneNumberOrEmail === 'number'){
      var recipientPhoneNumber = recipientPhoneNumberOrEmail;
      oldSend(recipientPhoneNumber, message);
    } else {
      var recipientEmail = recipientPhoneNumberOrEmail;
      return 'sending the message "'+ message +'" to ' + recipientEmail;
    }
  };
  return result;
};

// Here are the constructors to get you started

var Phone = function(phoneNumber) {

};

var SmartPhone = function(phoneNumber, email) {

};
