


//LOAD CONTACTS
$('#contact_btn').click( function () {
    $('#contact_list').empty();
    $('#contact_list').append('<li><a id="add_contact"><span class="glyphicon glyphicon-plus"></span><span class="glyphicon glyphicon-user"></span> <span class="text" >Kontakt hinzufügen</span></a></li><li class="divider"></li>');
    // contact handling
    $('#add_contact').click(function (){
        $('#modalAdContact').modal();
    });
    var contacts = contact.getAll();
    $.each(contacts, function(i, item) {
        $('#contact_list').append('<li><a><span class="text" value="'+contacts[i].logindata+'">'+contacts[i].name+', '+contacts[i].surname+'</span> <span class="label label-success">online</span></a></li>');
    });
    $('#contact_list li a .text').click(function () {
        var selected_contact = $(this).attr("value");
        $("#callTo").val(selected_contact);
    });
});

//show modules
showModule = {
    audio: function () {
        $('#voice_call_btn').addClass("active btn-danger");
    },
    video: function () {
        $('#own_video_container').fadeIn("slow").removeClass("hidden");
        $('#video_container').fadeIn("slow").removeClass("hidden");
        $('#video_call_btn').addClass("active btn-danger");
    },
    ownVideo: function () {
        $('#own_video_container').fadeIn("slow").removeClass("hidden");
        $('#video_container').fadeIn("slow").removeClass("hidden");
        $('#video_call_btn').addClass("active btn-danger");
    },
    chat: function () {
        $('#open_chat_btn').addClass("active btn-primary");
        showChatwindow();
    },
    start : function () {
        $('#welcome_div').fadeIn('slow').removeClass('hidden');
    },
    login : function () {
        $('#login').fadeIn("slow").removeClass("hidden");
    },
    all: function () {
        showModule.audio();
        showModule.video();
        showModule.ownVideo();
        showModule.chat();
    }
}

//hide modules
hideModule = {
    audio: function () {
        $('#voice_call_btn').removeClass("active btn-danger");
    },
    video: function () {
        $('#video_call_btn').removeClass("active btn-danger");
        $('#own_video_container').fadeOut('slow').addClass('hidden');
        $('#video_container').fadeOut('slow').addClass('hidden');
    },
    ownVideo: function () {
        $('#own_video_container').fadeOut("slow").addClass("hidden");
        $("#show_own_video").fadeIn('slow').removeClass('hidden');
    },
    av: function () {
        hideModule.audio();
        hideModule.ownVideo();
        $("#show_own_video").addClass('hidden');
        hideModule.video();
    },
    chat: function () {
        $('#chat').fadeOut("slow").addClass("hidden");
        $('#open_chat_btn').removeClass("active btn-primary");
    },
    avc: function () {
        hideModule.av();
        hideModule.chat();
    },
    all: function () {
        hideModule.avc();
        $('.after_login').fadeOut("slow").addClass("hidden");
        showModule.start();
        showModule.login();
    },
    start: function () {
        $('#welcome_div').fadeOut('slow').addClass('hidden');
    },
    login: function () {
        $('#login').addClass("hidden");
        $('.after_login').fadeIn("slow").removeClass("hidden");
        hideModule.start();
        $("callTo").focus();
    }
}

function showChatwindow() {
    //resize the chat area
    $(function () {
        $('#textChat').css("max-height", windowHeight() - 350);
        $('#textChat').css("overflow", "scroll");
    });
    $('#chat').fadeIn("slow").removeClass("hidden");
    $("#send_message").click(function () {
        sentMessageData();
        $("#datachannelmessage").attr("value", "");
        $("#datachannelmessage").text("");
        //do not submit the form:
        return false;
    });
    $("#send_file").click(function () {
        sentMessageDataFile();
    });
    $('#fileInput').change(function () {
        var filename = $('#fileInput').val().split('\\').pop();
        $('#fileSharing').append('<span class="label label-default">' + filename + ' </span>');
    });

    //add wysiwyg editor to txtarea
    $('#datachannelmessage').wysihtml5({
        "font-styles": true, //Font styling, e.g. h1, h2, etc. Default true
        "emphasis": true, //Italics, bold, etc. Default true
        "lists": false, //(Un)ordered lists, e.g. Bullets, Numbers. Default true
        "html": false, //Button which allows you to edit the generated HTML. Default false
        "link": false, //Button to insert a link. Default true
        "image": false, //Button to insert an image. Default true,
        "color": true //Button to change color of font
    });
}


/*the following functions are called after the DOM is ready: */
$(document).ready(function () {

    if (login.getData()!==null){
        hideModule.login();
        setStatus(login.getData())
    }

    $('#modal_add_contact_btn').click(function (){
        contact.store($('#input_login_name').val(),$('#input_login_surname').val(),$('#input_logindata').val());
        $('#modalAdContact').modal('hide');
    });


    $("#open_chat_btn").click(function () {
        if ((!($(this).hasClass('active'))) && (input_not_empty_check('#callTo') === true)) {
            showModule.chat();
            doIndividualCall('chat');
        } else hideModule.chat();
    });
    $("#voice_call_btn").click(function () {
        if ( (!($(this).hasClass('active'))) && (input_not_empty_check('#callTo') === true)) {
            showModule.audio();
            doIndividualCall('audio');
        } else hideModule.audio();
    });
    $("#video_call_btn").click(function () {
        if ((!($(this).hasClass('active'))) && (input_not_empty_check('#callTo') === true)) {
            showModule.video();
            doIndividualCall('audioVideo');
        } else hideModule.av();
    });

    //login and logout buttons
    $("#loginButton").click(function () {
        if (($("#loginButton").hasClass('btn-primary')) && (input_not_empty_check('#loginText') === true) ) {
            hideModule.login();
            initialize();
        }
    });
    $("#logout_btn").click(function () {
        hangup();
        hideModule.all();
        login.removeData();
        contact.removeAll();
    });


    //close buttons
    $("#video_container .close").click(function () {
        hangup();
        hideModule.av();
    });
    $("#chat .close").click(function () {
        hideModule.chat();
        closeConversation();
    });
    $("#own_video_container .close").click(function () {
        hideModule.ownVideo();

    });

    $("#show_own_video").click(function () {
        $("#show_own_video").addClass('hidden');
        showModule.ownVideo();
    });

    //modal outgoing call: cancel-btn
    $("#CancelInviting").click(function () {
        //$('#modalInviting').modal('hide');
        hideModule.av();
        hideModule.chat();
        closeConversation();
    });

    //modal incoming call
    $("#AcceptButton").click(function () {
        //handled in main.js
    });
    $("#RejectButton").click(function () {
        $('#modalInvite').modal({
            backdrop: 'static'
        }).modal('hide');
        Conversation.reject(message);
    });

    $("#refresh_chat").click(function () {
        updateConversation();
    });

    //toggle classes for tablist
    $('#conversation_tabs .item').click(function (evt) {
        evt.stopPropagation(); //stops the document click action
        $(this).siblings().removeClass('active');
        $(this).toggleClass('active');
    });

    //close tabs
    $('#conversation_tabs .item .close').click(function (evt) {
        evt.stopPropagation(); //stops the document click action
        $(this).parent().parent().remove();
    });
});


/* Helper function returns the window height for dynamic resizing */
function windowHeight() {
    if (window.innerHeight) {
        return window.innerHeight;
    } else if (document.body && document.body.offsetHeight) {
        return document.body.offsetHeight;
    } else {
        return 0;
    }
}

function input_not_empty_check(element) {
    if ( $(element).val().length !== 0 ) {
        $(element).parent().removeClass('has-error');
        return true;
    }
    else  {
        $(element).parent().addClass('has-error');
        return false;
    }
}
