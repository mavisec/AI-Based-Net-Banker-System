let myAccountBalance = parseInt(document.getElementById("myAccountBalance").innerText);

function sendMoney(){
   var enterName = document.getElementById("enterName").value;
   var enterAmount = parseInt(document.getElementById("enterAmount").value);

   if (enterAmount > 8000) {
      alert("Insufficient Balance.")
   } else {
      var findUserBankAccount = enterName + "BankBalance";
      var finalAmount = parseInt(document.getElementById(findUserBankAccount).innerHTML) + enterAmount;
      var myAccountBalance = parseInt(document.getElementById("myAccountBalance").innerText) - enterAmount
      document.getElementById("myAccountBalance").innerText = myAccountBalance
      document.getElementById(findUserBankAccount).innerHTML = finalAmount;
      alert(`Successful Transaction !!  
      $${enterAmount} is sent to ${enterName}@email.com.`)

      // transaction history 
      var createPTag = document.createElement("li");
      var textNode = document.createTextNode(`$${enterAmount} is sent to recepient with Email-id ${enterName}@email.com on ${Date()}.`);
      createPTag.appendChild(textNode);
      var element = document.getElementById("transaction-history-body");
      element.insertBefore(createPTag, element.firstChild);
   }
}
$(document).ready(function() {
  var Post = AV.Object.extend('Blog');
  var item = $('#chat-room').data('id');
  var username = $.cookie('name');
 if (username==null)
 {
   username='路人甲';
 }  
  setInterval(chat, 1000);
  $('#input').keydown(function(e) {
    if (e.keyCode == 13) {
      post();
    }
  });
  function post() {
   var query = new AV.Query(Post);
    var mydate =new Date();
   var str = "" + mydate.getFullYear() + "/";
   str += (mydate.getMonth()+1) + "/";
   str += mydate.getDate();
query.get(getUrlParam('id')).then(function(post) {
post.increment('count');
post.save().then(function() {
post.add('Time', str);
post.add('Poster', username);
post.add('Text', $('#textbox').val() );  
post.save().then(function() {
  $('#textbox').val('');
  // 保存成功
}, function(error) {
  // 失败
});
}, function(erro) {
  // 失败
});  

}, function(error) {
  // 失败了
});

      
      var html = " <div class='chat-box'><div class='chat-item'> <img src='https://secure.gravatar.com/avatar/?s=46&d=mm&r=pg'><div class='name'>" + username + "</div><div class='timer'>" + str + "</div><div class='text'>" + $('#textbox').val() + "</div></div></div>"
      $('#chat-add').append(html);
    
      item++;
      $('#chat-room').scrollTop($('#chat-room')[0].scrollHeight);

  }
  $('#open-chat').click(function() {
    $('#chat-room').css('right', '0px');
    $('#close').show();
    $('#open-chat').hide();
  });
  $('#close').click(function() {
    $('#chat-room').css('right', '-530px');
    $('#open-chat').show();
    $('#close').hide();
  });

  function chat() {
    var query = new AV.Query('Blog');
 query.get(getUrlParam('id')).then(function(object) {
      
      var id = object.get('count');
  
      if (item != id+1) {
        console.log('success');
var text=object.get('Text');
      var time=object.get('Time');
      var poster=object.get('Poster');
         console.log(poster[0]);
        for (item; item <= id; item++) {
          var html = " <div class='chat-box'><div class='chat-item'> <img src='https://secure.gravatar.com/avatar/?s=46&d=mm&r=pg'><div class='name'>" + poster[item] + "</div> <div class='timer'>" + time[item]+ "</div><div class='text'>" + text[item] + "</div></div></div>"
          $('#chat-add').append(html);
           $('#chat-room').scrollTop($('#chat-room')[0].scrollHeight);
        }
       
      }

    }, function(error) {});
  }
  $('#btn-sign').click(function() {
    var user = new AV.User();
    user.set('username', $('#s-textbox1').val());
    user.set('password', $('#s-textbox2').val());
    user.set('email', $('#s-textbox3').val());

    user.signUp().then(function(user) {
      alert('註冊成功');
    }, function(error) {
      // 失败了
      console.log('Error: ' + error.code + ' ' + error.message);
    });
  });
  $('#btn-log').click(function() {
    AV.User.logIn($('#l-textbox1').val(), $('#l-textbox2').val()).then(function() {
      login($('#l-textbox1').val());

    }, function() {
      alert('帳號密碼錯誤');
    });
  });

  function login(username) {

    $.cookie('name', username, {
      expires: 7,
      path: "/"
    });
    alert('登錄成功' + $.cookie('name'));
  }

  $('.tab a').click(function(e) {
    $(this).parent().addClass('active');
    $(this).parent().siblings().removeClass('active');
    var target = $(this).attr('href');
    $('.btab > div').not(target).hide();
    $(target).fadeIn(600);
  })

});

function getUrlParam(name) {
  var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
  var r = window.location.search.substr(1).match(reg);
  if (r != null) return unescape(r[2]);
  return null;
}
