
let addgroup = []
let wishes = []

$.getJSON(`add_group/all`, data => {
    addgroup = data
    fillDropDown('groupid', data, 'Choose Group Name', 0)
  
})



$.getJSON(`/OrganApi/request-donor-list`, data => {
    console.log(data)
    wishes = data
    makeTable(data)
  
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
          <h3 class="text-white mb-0">All User Request</h3>
         
        </div>
       
      
      
        <div class="table-responsive">
          <table class="table align-items-center table-dark table-flush">
            <thead class="thead-dark">
              <tr>

                <th scope="col">Organ Name</th>
                <th scope="col">Name</th>
                <th scope="col">Age</th>
                <th scope="col">Address</th>
                <th scope="col">Mobile Number</th>
                <th scope="col">Email</th>
                <th scope="col">DOB</th>
                <th scope="col">Blood Group</th>
                <th scope="col">Gender</th>
               
                <th scope="col"></th>
              </tr>
            </thead>
            <tbody>
                  <tr>`
                  $.each(board, function(i, item) {
                    table += `





<th scope="row">
                      <div class="media align-items-center">
                        <div class="media-body">
                          <span class="mb-0 text-sm">${item.organ_name}</span>
                        </div>
                      </div>
                    </th>


                    <th scope="row">
                      <div class="media align-items-center">
                        <div class="media-body">
                          <span class="mb-0 text-sm">${item.name}</span>
                        </div>
                      </div>
                    </th>
                   
                    <th scope="row">
                    <div class="media align-items-center">
                      <div class="media-body">
                        <span class="mb-0 text-sm">${item.age}</span>
                      </div>
                    </div>
                  </th>

                  <th scope="row">
                  <div class="media align-items-center">
                    <div class="media-body">
                      <span class="mb-0 text-sm">${item.address}</span>
                    </div>
                  </div>
                </th>



                <th scope="row">
                  <div class="media align-items-center">
                    <div class="media-body">
                      <span class="mb-0 text-sm">${item.number}</span>
                    </div>
                  </div>
                </th>

               

                <th scope="row">
                  <div class="media align-items-center">
                    <div class="media-body">
                      <span class="mb-0 text-sm">${item.email}</span>
                    </div>
                  </div>
                </th>


                 <th scope="row">
                  <div class="media align-items-center">
                    <div class="media-body">
                      <span class="mb-0 text-sm">${item.dob}</span>
                    </div>
                  </div>
                </th>


                 <th scope="row">
                  <div class="media align-items-center">
                    <div class="media-body">
                      <span class="mb-0 text-sm">${item.blood_group}</span>
                    </div>
                  </div>
                </th>


                 <th scope="row">
                  <div class="media align-items-center">
                    <div class="media-body">
                      <span class="mb-0 text-sm">${item.gender}</span>
                    </div>
                  </div>
                </th>
              

   <th scope="row">
                  <div class="media align-items-center">
                    <div class="media-body">
                     <button type='button' class='btn btn-danger delete' id="${item.id}">Delete</button>
                    </div>
                  </div>
                </th>
               

               
                   
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




function refresh() 
{
    $.getJSON(`/OrganApi/request-donor-list`, data => makeTable(data))
}

function update()
{
    $('#result').show()
 
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



$('#result').on('click', '.delete', function() {
    const id = $(this).attr('id')
  $.post('/OrganApi/organ-donor-delete',{id},data=>{
    alert('Deleted Successfully')
    refresh()
  })
})


//===================================Page Functioality Ends========================//