$(function(){
  function buildHTML(message){

    var addImage = '';
    if (message.image) {
      addImage = `<img src="${message.image}" class="lower-message_image" >`
    }

      var html = `<div class="message" data-message-id= '${message.id}' >
        <div class="upper-message">
          <div class="upper-message__user-name">
            ${message.user_name} 
          </div>
          <div class="upper-message__date">
            ${message.date}
          </div>
        </div>
        <div class="lower-message">
          <p class="lower-message__content">
            ${message.content}
          </p> 
          ${addImage}
        </div>
      </div>`
    return html;
  }
  $('#new_message').on('submit', function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action')
    $.ajax({
      url: url,  
      type: 'POST',  
      data: formData,  
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(message) {
      var insertHTML = '';
      insertHTML += buildHTML(message)
      $('.chat-main__messages__message').append(insertHTML);
      $('.chat-main__messages').animate({ scrollTop: $('.chat-main__messages')[0].scrollHeight});
      $('#new_message')[0].reset();
      $(".chat-main__form__box__send").prop('disabled', false);
    })
    .fail(function() {
      alert("メッセージ送信に失敗しました");
    })
  });
    var reloadMessages = function() {
      var last_message_id = $('.message:last').data('message-id')
      $.ajax({
        url: 'api/messages',
        type: 'GET',
        dataType: 'json',
        data: {id: last_message_id}
      })
      .done(function(messages) {
        var insertHTML = '';
        $.each(messages, function(i, message) {
          insertHTML += buildHTML(message)
        });
        $('.chat-main__messages__message').append(insertHTML);
        $('.chat-main__messages').animate({ scrollTop: $('.chat-main__messages')[0].scrollHeight});
      })
      .fail(function() {
        console.log('error');
      });
    };
    var path = location.href;
    if(path.match(/\/groups\/\d+\/messages/)){
      setInterval(reloadMessages, 5000);
    }else{
      console.log('error');
    }
});