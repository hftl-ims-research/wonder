/* test data */
var firstContact = '"'+getUniqueId()+'": {"name": "Doe", "surname": "Bob", "logindata": "bob@nodejs.wonder"}';
var initialdata = '{"contacts": {'+firstContact+'}}';

if (localStorage.getItem("contacts") === null){
    localStorage.setItem("contacts", initialdata);
}
    /* end test data */

var login = {
    getData : function() {
        return localStorage.getItem("login");
    },
    setData : function(data) {
        localStorage.setItem("login", data);
    },
    removeData: function (){
        localStorage.removeItem("login");
    }
}

var contact = {
    get: function (id) {
        var contactlist = JSON.parse(localStorage.getItem("contacts"));
        return contactlist["contacts"][id];
    },
    getAll: function () {
        var contactlist = JSON.parse(localStorage.getItem("contacts"));
        return contactlist["contacts"];
    },
    store: function (name, surname, login) {
        var contactlist = JSON.parse(localStorage.getItem("contacts"));
        var id = getUniqueId();
        //contactlist['contacts'].push({ id : {"name":name, "surname":surname, "logindata": login}});
        contactlist["contacts"][id] = {"name":name, "surname":surname, "logindata": login};
        localStorage.setItem("contacts",JSON.stringify(contactlist));
    },
    remove: function (id) {
        localStorage.removeItem(id);
    },
    removeAll: function (){
        localStorage.removeItem("contacts");
    }
}

var messages = {
    getAll: function () {
        return localStorage.getItem("messages");
    },
    store: function (data) {
        //if no key exists, create a new key
        localStorage.setItem("messages", data);
    }
}

function getUniqueId (){
    var uniqid = Date.now();
    var randLetter = String.fromCharCode(65 + Math.floor(Math.random() * 26));
    var uniqid = randLetter + Date.now();
    return uniqid;
}
