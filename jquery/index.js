
    $(document).ready(function(){


 ///// replace with Your code snippet
////// Initialize Firebase
  var config = {
      apiKey: "AIzaSyA9era-3rZl2r12o3zi7KxQRxdDuWrNw5M",
      authDomain: "test111-29980.firebaseapp.com",
      databaseURL: "https://test111-29980.firebaseio.com",
      projectId: "test111-29980",
      storageBucket: "test111-29980.appspot.com",
      messagingSenderId: "1068744502107",
      appId: "1:1068744502107:web:5f2844507a09c5c9"
  };
  firebase.initializeApp(config);


//////todo display start ////////////////
    var getvalue = firebase.database().ref('to_do/');
    getvalue.on('value', function(snapshot) {
      var tbodyEl = $('tbody');
      tbodyEl.html('');
      var a = 0;
      snapshot.forEach(function(product) {
        a = a+1;
        tbodyEl.append('\
          <tr>\
          <td class="id">' + product.val().id + '</td>\
          <td>' + a + '</td>\
          <td><input type="text" class="uk-input" id='+ product.val().id +' value= '+ product.val().name +' readonly></td>\
          <td>\
          <button class="uk-button-primary edit" id="edit'+ product.val().id +'">Edit</button>\
          <button class="uk-button-danger" id="delete">Done/Delete</button>\
          </td>\
          </tr>\
          ');
      });
    });
//////todo display end ////////////////

//////add todo start ////////////////
    $( "#add" ).click(function() {
      var task = $('#todo').val();  
      var status = $('#status').val();  
      add_todo(task, status);  
      $('#form')[0].reset();
    }); 

    function add_todo(name, status) {
      var newPostKey = firebase.database().ref().child('to_do').push().key;
      var user = {
        id: newPostKey,
        created_at: firebase.database.ServerValue.TIMESTAMP,
        name: name,
        status: status
      };
      var updates = {};
      updates['/to_do/' + newPostKey] = user;
      return firebase.database().ref().update(updates);
    }
//////add todo end ////////////////

//////update todo start ////////////////
    $('table').on('click', '.edit', function() {

      var rowEl = $(this).closest('tr');
      var id = rowEl.find('.id').text();
      $('#'+id).attr("readonly", false);
      $("#edit"+id).html('Update');
      $("#edit"+id).addClass('update').removeClass('edit');
      $("#edit"+id).prop('id', 'update'+id);

    });

    $('table').on('click', '.update', function() {
      var rowEl = $(this).closest('tr');
      var id = rowEl.find('.id').text();
      var name = $('#'+id).val();
      $('#'+id).attr("readonly", false);
      $('#'+id).attr("readonly", true);
      $("#update"+id).html('Edit');
      $("#update"+id).addClass('edit').removeClass('update');
      $("#update"+id).prop('id', 'edit'+id);
      update_todo(id,name);
    });

    function update_todo(id, name) {
      console.log(id, name);
      var updates = {};
      updates['to_do/' + id + "/name"] = name;
      return firebase.database().ref().update(updates);
    }
//////update todo end ////////////////

//////delete todo start ////////////////
    $('table').on('click', '#delete', function() {
      var rowEl = $(this).closest('tr');
      var id = rowEl.find('.id').text();
      delete_todo(id);
    });

    function delete_todo(id) {
      var rootRef = firebase.database().ref().child('to_do');
      rootRef.child(id).remove();
    }
//////delete todo end ////////////////
});

