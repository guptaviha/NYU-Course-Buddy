var access_token = localStorage.getItem("id_token");
//console.log(access_token);
//var access_token="eyJraWQiOiIrRUlCVHBVTngyeGhcLzg3MEpSUEh0T2QzRUdlRU1wZG1EZ3UxTkpTMWptOD0iLCJhbGciOiJSUzI1NiJ9.eyJhdF9oYXNoIjoiM21PRTBCb1ozWFZ0OFlZQU0tSHcxUSIsInN1YiI6IjAwMzI1YWM2LTE5YWQtNGY0MC05MDFhLTBlNjc2ZTkwNmZhMSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJpc3MiOiJodHRwczpcL1wvY29nbml0by1pZHAudXMtZWFzdC0xLmFtYXpvbmF3cy5jb21cL3VzLWVhc3QtMV9MVDZmT1ZnQ2IiLCJjb2duaXRvOnVzZXJuYW1lIjoiYmFwcGkiLCJhdWQiOiI1NTliMXQ2bWxya2hycDIwdm9uOXE0djJhZCIsImV2ZW50X2lkIjoiZWY2YTU4OTktOGRhNC00NjhhLWJlZjgtODQxN2E1NzVmNTJmIiwidG9rZW5fdXNlIjoiaWQiLCJhdXRoX3RpbWUiOjE2NTI2NjUwNjEsImV4cCI6MTY1Mjc1MTQ2MSwiaWF0IjoxNjUyNjY1MDYxLCJqdGkiOiJkYzY1NTJiYy0wYjkxLTQ5YzktYjFhYy0zNjYxY2MxNzYyNWUiLCJlbWFpbCI6ImNoaS5iaGFyYXRoc2FpQGdtYWlsLmNvbSJ9.QeIbGjJriLb89pwUexPAHK6Q6agi0oH5WHIO_IlMC6cMGHf_kfxH1RRSLXj17F0ntBn9Klvr6kewrPI9FPU96lxaueaGpeA5LBDt4RmkZDC8LPGgWZer9Wr1Jlre_8Auz74klxj6X7YJ_UfMg1BDa4_DEKK34srMF_2ooTP-h6wNQArR27wYdwaZv5oCtB_ybRyRzXJDD4uAvdf67hQZqaDYe7ZhNfwJltp_jbeDmJRqGpCBDMjzV8rRaANVCXuSF4sR9yAMGSzXaowVdWleo89m-iP-3kNt_ZWbhFkL3EgYAtpugKZ0GieNEzBDi8_lS36Bp56e0XWtwWZAINu4nw";

var params={
    "Authorization":access_token
    }
var body={
    "Authorization":access_token
    }
var apigClient = apigClientFactory.newClient({ });
var checkout = {};

$(document).ready(function() {
  var $messages = $('.messages-content'),
    d, h, m,
    i = 0;

  $(window).load(function() {
    $messages.mCustomScrollbar();
    insertResponseMessage('Hello, Welcome to NYU Course Buddy. How can I help you today?');
  });

  function updateScrollbar() {
    $messages.mCustomScrollbar("update").mCustomScrollbar('scrollTo', 'bottom', {
      scrollInertia: 10,
      timeout: 0
    });
  }

  function setDate() {
    d = new Date()
    if (m != d.getMinutes()) {
      m = d.getMinutes();
      $('<div class="timestamp">' + d.getHours() + ':' + m + '</div>').appendTo($('.message:last'));
    }
  }

  function callChatbotApi(message) {
    // params, body, additionalParams
    return apigClient.chatbotPost(params, {
      messages: [{
        type: 'unstructured',
        unstructured: {
          text: message
        }
      }]
    },{});
  }

  function insertMessage() {
    msg = $('.message-input').val();
    if ($.trim(msg) == '') {
      return false;
    }
    $('<div class="message message-personal">' + msg + '</div>').appendTo($('.mCSB_container')).addClass('new');
    setDate();
    $('.message-input').val(null);
    updateScrollbar();

    callChatbotApi(msg)
      .then((response) => {
        console.log(response);
        var data = response.data;

        if (data.messages && data.messages.length > 0) {
          console.log('received ' + data.messages.length + ' messages');
          console.log(data.messages);

          var messages = data.messages;

          for (var message of messages) {
            //console.log(message.unstructured.text)
           // insertResponseMessage(message.unstructured.text);
            if (message.type === 'unstructured') {
              
              insertResponseMessage(message.unstructured.text);
            } else if (message.type === 'structured' && message.structured.type === 'product') {
              var html = '';

              insertResponseMessage(message.structured.text);

              setTimeout(function() {
                html = '<img src="' + message.structured.payload.imageUrl + '" witdth="200" height="240" class="thumbnail" /><b>' +
                  message.structured.payload.name + '<br>$' +
                  message.structured.payload.price +
                  '</b><br><a href="#" onclick="' + message.structured.payload.clickAction + '()">' +
                  message.structured.payload.buttonLabel + '</a>';
                insertResponseMessage(html);
              }, 1100);
            } else {
              console.log('not implemented');
            }
          }
        } else {
          
          insertResponseMessage('Error');
        }
      })
      .catch((error) => {
        console.log('an error occurred', error);
        insertResponseMessage('Oops, something went wrong. Please try again.');
      });
  }

  $('.message-submit').click(function() {
    insertMessage();
  });

  $(window).on('keydown', function(e) {
    if (e.which == 13) {
      insertMessage();
      return false;
    }
  })

  function insertResponseMessage(content) {
    $('<div class="message loading new"><figure class="avatar"><img src="https://c.tenor.com/qrFMm-y-hX8AAAAC/svn-serviervn.gif" /></figure><span></span></div>').appendTo($('.mCSB_container'));
    updateScrollbar();

    setTimeout(function() {
      $('.message.loading').remove();
      $('<div class="message new"><figure class="avatar"><img src="https://c.tenor.com/qrFMm-y-hX8AAAAC/svn-serviervn.gif" /></figure>' + content + '</div>').appendTo($('.mCSB_container')).addClass('new');
      setDate();
      updateScrollbar();
      i++;
    }, 500);
  }

});
