
let addgroup = []
let wishes = []

$.getJSON(`add_group/all`, data => {
    addgroup = data
    fillDropDown('groupid', data, 'Choose Group Name', 0)
  
})

$('#show').click(function(){
$.getJSON(`/admin/show`, data => {
    console.log(data)
    wishes = data
    makeTable(data)
  
})
})

function fillDropDown(id, data, label, selectedid = 0) {
    $(`#${id}`).empty()
    $(`#${id}`).append($('<option>').val("null").text(label))

    $.each(data, (i, item) => {
        if (item.id == selectedid) {
            $(`#${id}`).append($('<option selected>').val(item.id).text(item.name))
        } else {
            $(`#${id}`).append($('<option>').val(item.id).text(item.name))
        }
    })
}

    





function makeTable(board){
    let table = ` <div class="row mt-5">
    <div class="col">
      <div class="card bg-default shadow">
        <div class="card-header bg-transparent border-0">
          <h3 class="text-white mb-0">All Student Details</h3>
          <br>
          <button type="button" id="back" class="btn btn-sm btn-primary">BacK</button>
        </div>
       
      
      
        <div class="table-responsive">
          <table class="table align-items-center table-dark table-flush">
            <thead class="thead-dark">
              <tr>
                <th scope="col">Type</th>
                <th scope="col">Font Color</th>
                <th scope="col">Back Color</th>
                <th scope="col">Image</th>
                <th scope="col"></th>
              </tr>
            </thead>
            <tbody>
                  <tr>`
                  $.each(board, function(i, item) {
                    table += `<th scope="row">
                      <div class="media align-items-center">
                        <div class="media-body">
                          <span class="mb-0 text-sm">${item.status}</span>
                        </div>
                      </div>
                    </th>
                   
                    <th scope="row">
                    <div class="media align-items-center">
                      <div class="media-body">
                        <span class="mb-0 text-sm">${item.fontcolor}</span>
                      </div>
                    </div>
                  </th>

                  <th scope="row">
                  <div class="media align-items-center">
                    <div class="media-body">
                      <span class="mb-0 text-sm">${item.backgroundcolor}</span>
                    </div>
                  </div>
                </th>


            <th scope="row">
            <div class="media align-items-center">
              <a href="#" class="avatar rounded-circle mr-3">
                <img alt="Image placeholder" src="/images/${item.image}">
              </a>
              
            </div>
          </th>

         
                    <td class="text-right">
                      <div class="dropdown">
                        <a class="btn btn-sm btn-icon-only text-light" href="#" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                          <i class="fas fa-ellipsis-v"></i>
                        </a>
                        <div class="dropdown-menu dropdown-menu-right dropdown-menu-arrow">
                        <button class=" dropdown-item btn btn-outline-success delete" id="${item.id}">Delete</button>
                      
                        </div>
                      </div>
                    </td>
                  </tr>`
                  })
                  
              table +=` </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>`
      $('#result').html(table)
      $('#insertdiv').hide()
      $('#result').show()
}


$('#result').on('click', '.delete', function() {
    const id = $(this).attr('id')
    $.get(`/admin/delete`,  { id }, data => {
        refresh()
    })
})



$('#result').on('click', '.edit', function() {
    const id = $(this).attr('id')
    const result = student.find(item => item.id == id);
    fillDropDown('pgroupid', addgroup, 'Choose Quiz Name', result.name)
    $('#editdiv').show()
    $('#insertdiv').hide() 
    $('#result').hide()
    $('#pid').val(result.id)
    $('#pstatus').val(result.status)
    $('#pname').val(result.name)
    $('#pemail').val(result.email)
    $('#pnumber').val(result.number)
    $('#proll_number').val(result.roll_number)

 })


 
$('#update').click(function(){  //data insert in database
    let updateobj = {
        id: $('#pid').val(),
        groupid:$('#pgroupid').val(),
        name: $('#pname').val(),
        email: $('#pemail').val(),
        number: $('#pnumber').val(),
        roll_number: $('#proll_number').val(),
      
      
    }

    $.post(`/admin/update`, updateobj , function(data) {
       update()
    })
})


function refresh() 
{
    $.getJSON(`/admin/show`, data => makeTable(data))
}
function update()
{
    $('#result').show()
    $('#editdiv').hide()
    $('#insertdiv').show() 
    refresh()
    refresh()
}

//================================Page Functionality=============================//
$('#editdiv').hide()
$('#updateimagediv').hide()

$('#result').on('click', '#back', function() {
    $('#result').hide()
    $('#insertdiv').show()
})

$('#back1').click(function(){
    $('#result').show()
    $('#insertdiv').hide()
    $('#editdiv').hide()
    $('#updateimagediv').hide()

})

$('#back2').click(function(){
    $('#result').show()
    $('#insertdiv').hide()
    $('#editdiv').hide()
    $('#updateimagediv').hide()
})



$('#result').on('click', '.updateimage', function() {
    const id = $(this).attr('id')
    const result = student.find(item => item.id == id);
    $('#peid').val(result.id)
    $('#updateimagediv').show()
    $('#result').hide()
    $('#insertdiv').hide()
    $('#editdiv').hide()
})

//===================================Page Functioality Ends========================//