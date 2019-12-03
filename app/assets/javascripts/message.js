$(function(){
  function buildHTML(message){

    var addImage = '';
    if (message.image) {
      addImage = `<img src="${message.image}" class="lower-message_image" >`
    }

    // if (message.image) {
      var html = `<div class="message" data-message_id= '${message.id}' >
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
    // } else {
    //   var html = `<div class="message" data-message_id= "${message.id}" >
    //     <div class="upper-message"> 
    //       <div class="upper-message__user-name">
    //         ${message.user_name}
    //       </div>
    //       <div class="upper-message__date">
    //         ${message.date} 
    //       </div>
    //     </div>
    //     <div class="lower-message">
    //       <p class="lower-message__content">
    //         ${message.content} 
    //       </p> 
    //     </div>
    //   </div>`
    // }
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
      // $.each(messages, function(i, message) {
      //   insertHTML += buildHTML(message)
      //   console.log(message)
      // });
      $('.chat-main__messages__message').append(insertHTML);
      $('.chat-main__messages').animate({ scrollTop: $('.chat-main__messages')[0].scrollHeight});
      $('#new_message')[0].reset();
      $(".chat-main__form__box__send").prop('disabled', false);
    })
    .fail(function() {
      alert("メッセージ送信に失敗しました");
    })
  })
})