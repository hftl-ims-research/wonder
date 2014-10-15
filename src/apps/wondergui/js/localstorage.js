/* test data */
var initialdata = '{"contacts": {"'+getUniqueId()+'": {"name": "Name1", "surname": "Surname1", "logindata": "Mail@example.com"}}}';
localStorage.setItem("contacts", initialdata);
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
    }
}

function getUniqueId (){
    var uniqid = Date.now();
    var randLetter = String.fromCharCode(65 + Math.floor(Math.random() * 26));
    var uniqid = randLetter + Date.now();
    return uniqid;
}
