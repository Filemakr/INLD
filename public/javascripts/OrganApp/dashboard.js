
let addgroup = []
let wishes = []

$.getJSON(`add_group/all`, data => {
    addgroup = data
    fillDropDown('groupid', data, 'Choose Group Name', 0)
  
})



$.getJSON(`/OrganApi/all-donor-request`, data => {
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
          <h3 class="text-white mb-0">All Donor Request</h3>
         
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
                <th scope="col">State</th>
                <th scope="col">City</th>
                <th scope="col">District</th>
                <th scope="col">Pincode</th>
                <th scope="col">Occupation</th>
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
                      <span class="mb-0 text-sm">${item.state}</span>
                    </div>
                  </div>
                </th>

                <th scope="row">
                  <div class="media align-items-center">
                    <div class="media-body">
                      <span class="mb-0 text-sm">${item.city}</span>
                    </div>
                  </div>
                </th>

                <th scope="row">
                  <div class="media align-items-center">
                    <div class="media-body">
                      <span class="mb-0 text-sm">${item.district}</span>
                    </div>
                  </div>
                </th>

                <th scope="row">
                  <div class="media align-items-center">
                    <div class="media-body">
                      <span class="mb-0 text-sm">${item.pincode}</span>
                    </div>
                  </div>
                </th>

               

                <th scope="row">
                  <div class="media align-items-center">
                    <div class="media-body">
                      <span class="mb-0 text-sm">${item.occupation}</span>
                    </div>
                  </div>
                </th>
              

                   <th scope="row">
                  <div class="media align-items-center">
                    <div class="media-body">
                     <button class ="btn btn-success update" id="${item.id}">Accept</button>
                    </div>
                  </div>
                </th>



 <th scope="row">
                  <div class="media align-items-center">
                    <div class="media-body">
                     <button class ="btn btn-danger delete" id="${item.id}">Reject</button>
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


$('#result').on('click', '.delete', function() {
    const id = $(this).attr('id')
    $.get(`/OrganApi/reject-donor`,  { id }, data => {
        refresh()
    })
})





 
$('#result').on('click', '.update', function() {
     const id = $(this).attr('id')
    let updateobj = {
       status :'accept',id
    }

    $.post(`/OrganApi/accept-donor`, updateobj , function(data) {
       update()
    })
})


function refresh() 
{
    $.getJSON(`/OrganApi/all-donor-request`, data => makeTable(data))
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