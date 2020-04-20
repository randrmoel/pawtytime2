$(document).ready(function() {
  // This file just does a GET request to figure out which user is logged in
  // and updates the HTML on the page

  $(".modal").modal();
  $(".tooltipped").tooltip();
  //books an appointment

  // First get the current user and wrap this around
  // all other functions
  $.get("/api/user_data").then(function(user){
    const putAppt = (apptId, dog, wM) => {
      console.log("apptId:"+ apptId, "Dog Id" + dog, "Memo: "+ wM);
      $.ajax({
        url: "/api/change-walk/"+ apptId,
        method: "PUT",
        data: {
          dogUser: dog,
          DogId: dog,
          walkMemo: wM
        }
    }).then(function(data){
      console.log(data);
      });
    };
  
    var apptLine;
   
  // Function to update appointment
  // list in modal prior to booking appointment
    const updateAppt = (response) =>{
      let idnt = 0;
      let tm = "00:00:00";
      let dt = "2020-01-01"
      let wM = "";
      let html1 = "";
      $('#apptList').empty();

    for (i = 0; i < response.length; i++) {
      idnt = response[i].id;
      tm = response[i].timeSlot;
      dt = response[i].walkDate;
      wM = response[i].walkMemo;
      dg = 0;
      apptLine = 
      `<li>
        <div class="row">

            <div data-appt = ${idnt} class="col s2">
              <a class="waves-effect waves-light btn-large apptBtn" id=${idnt}tb>
                ${idnt}
              </a>
            </div> <!--end column 1-->
            <div class="col s2 hour">
              ${tm}
            </div> <!--end column 2-->
            <div class="col s2 date">
              ${dt}
            </div> <!-- end column 3 -->
            <div class = "col m2 s2 dog">
              <div class="input-container">
                Dog ID: <input id = "${idnt}dg" type="text" placeholder="${dg}" class="whchDog">
              </div>
            </div> <!--end of column 4-->
            <div class="col s12 input-display">
              <div class="input-container">
                <input id="${idnt}wm" type="text" placeholder="${wM}" class="walkMemo">
                <!--<i class="material-icons">
                  create
                </i>-->
              </div>
            </div> <!--end column 5-->
          </div> <!--End of Row -->
        </li>`
      html1 = html1 + apptLine;
    } 
    $('#apptList').html(html1);
  }

  $.ajax({
    url: "/api/appt",
    method: "GET"
  }).then(function(resp1){
    updateAppt(resp1);
    var whchAppt = document.getElementById("apptList");
    whchAppt.addEventListener("click", event =>{
      let t1 = event.target.classList.value.includes("apptBtn");
      //let t2 = event.target.classList.value.includes("inNum");
      if(t1 /*|| t2*/){
        ans = event.target.id.slice(0,-2);
        dogTg = "#"+ ans + "dg"
        wmTg = "#" + ans + "wm"
        console.log(ans);
        console.log($(dogTg).val());
        console.log($(wmTg).val());
        putAppt(ans, $(dogTg).val(), $(wmTg).val());
        $.ajax({
          url: "/api/appt",
          method: "GET"
        }).then(function(resp2){
          updateAppt(resp2);
          $("#scheduleModal").modal("close");
          refreshAppt();
        });
      };
    });
  });


  //function to get first namer of dog owner
  $.get("/api/actor/" + user.id).then(function(data) {
    $("#UserName").text(data.firstName);
  });

  //function to get any active upcoming appointments
  
  const refreshAppt = () =>{
    $("#defaultMessage").show();
    $.get("/api/mydog/" + user.id).then(function(data) {
      if(data.length == 0){
        $("#appointments").empty();
        $("#appointments").html(`
        <li class="collection-header">
        <h4>
          Upcoming Appointments
        </h4>
      </li>
      <li class="collection-item" id="defaultMessage">
        You have no upcoming appointments!
      </li>`)
      $("defaultMessage").show();
      }
      if (data.length > 0) {
        $("#defaultMessage").hide();
        $("#appointments").empty();
        for (i = 0; i < data.length; i++) {
          
          $("#appointments").append(
            `<li class="collection-item">
              <div class = "row">
                <div class = "col">
                  Dog Name: ${data[i].Dog.dogName}
                  <br>
                  Walk Date: ${data[i].walkDate}
                  <br>
                  Time Slot: ${data[i].timeSlot}
                </div> <!-- end of col-->
                <div class = "col">
                  <a id=${data[i].id}ap  data-cncl = ${data[i].id} class="waves-effect waves-light btn-small cnclBtn">
                    Cancel Appt
                    <i class="material-icons right">
                      cancel
                    </i>
                  </a>
                </div>
              </div> <!--end of row-->
            </li>`
          );
        }
      }else {
        $("#defaultMessage").show();
      }
    });
  };

    refreshAppt();

    //listen for cancel appointments
    var whchCncl = document.getElementById("appointments"); 
    whchCncl.addEventListener("click", event =>{
      let t3 = event.target.classList.value.includes("cnclBtn");
      if(t3){
        ans = event.target.id.slice(0,-2);
        console.log("Appt ID to Cancel:")
        console.log(ans);
        $.ajax({
          url: "/api/cancel-walk/"+ans,
          method: "PUT"
        }).then(function(resp3){
          refreshAppt();
          alert("canceled");
        }).catch(function(err){
          console.log(err);
          alert("no such appointment");
        })
      }
    });

  //retrieving current dog data and creating an li
  function getDogData(){
  $.get("/api/dog/" + user.id).then((results) => {
      $("#petList").empty();  
      results.forEach(function(res){
        $("#petList").append(
          `<li class="collection-item dogs" >
            <div class="row">
              <div class="col s9">
                Dog Name: ${res.dogName}<br>Breed: ${res.breed}<br>Dog ID: ${res.id}
              </div>
              <div class="col s3">
              <a class="secondary-content btn-flat">
                <i class="material-icons red-text dogDelBtn" id="${res.id}dg">
                  delete_forever
                </i>
              </a>
            </div>
          </div>
        </li>`
        );
      });
    });
  };

  //revised Delete dog
  var whchDog = document.getElementById("petList"); 
  whchDog.addEventListener("click", event =>{
    let t4 = event.target.classList.value.includes("dogDelBtn");
    if(t4){
      ans = event.target.id.slice(0,-2);
      console.log("Dog ID to Delete:")
      console.log(ans);
      $.ajax({
        url: "/api/cancel-all/"+ ans,
        method: "PUT"
      }).then(function(resp3){
        refreshAppt();
      }).catch(function(err){
        console.log(err);
        alert("no such dog");
      });
      $.ajax({
        method: "DELETE",
        url: "/api/dog/" + ans,
      }).then(function(resp5){
        getDogData();
        alert("Deleted & All Appts Canceled");
      })
    };
  });

  $("#addPet").on("click", function(){
    getDogData();
  });

    //add pet button to post new dog info to db
    $("#addPetBtn").on("click", function(event) {
      event.preventDefault();
      getDogData();
    
      const dogName = $("#dog_name");
      const breed = $("#breed");
      

      const newDog = {
        dogName: dogName.val().trim(),
        breed: breed.val().trim(),
        DogActorId: user.id,
      };

      $.post("/api/dog/", newDog).then(function(result) {        
      }).then(function(){
        dogName.val("");
        breed.val("");
        getDogData();
      })
    });

    //autofills Member Profile
    $.get("/api/actor/" + user.id).then(results => {
      $("#firstNam").html(results.firstName);
      $("#lastNam").html(results.lastName);
      $("#add1").html(results.address1);
      $("#add2").html(results.address2);
      $("#cit").html(results.city);
      $("#st").html(results.st);
      $("#zip").html(results.zip5);
      $("#profEmail").html(results.email);
      $("#profPhone").html(results.phone);
    });
  });
});


// floating action navbar at the bottom of page
document.addEventListener("DOMContentLoaded", function() {
  var elems = document.querySelectorAll(".fixed-action-btn");
  var instances = M.FloatingActionButton.init(elems, {
    toolbarEnabled: true,
  });
});

$(document).ready(function() {
  $("#breed").autocomplete({
    data: {
      affenpinscher: null,
      african: null,
      airedale: null,
      akita: null,
      appenzeller: null,
      australianshepherd: null,
      basenji: null,
      beagle: null,
      bluetick: null,
      borzoi: null,
      bouvier: null,
      boxer: null,
      brabancon: null,
      briard: null,
      norwegianbuhund: null,
      bostonbulldog: null,
      englishbulldog: null,
      frenchbulldog: null,
      staffordshirebullterrier: null,
      cairn: null,
      australiancattledog: null,
      chihuahua: null,
      chow: null,
      clumber: null,
      cockapoo: null,
      bordercollie: null,
      coonhound: null,
      cardigancorgi: null,
      cotondetulear: null,
      dachshund: null,
      dalmatian: null,
      greatdane: null,
      scottishdeerhound: null,
      dhole: null,
      dingo: null,
      doberman: null,
      norwegianelkhound: null,
      entlebucher: null,
      eskimo: null,
      finnishlapphund: null,
      bichonfrise: null,
      germanshepherd: null,
      italiangreyhound: null,
      groenendael: null,
      havanese: null,
      afghanhound: null,
      bassethound: null,
      bloodhound: null,
      englishhound: null,
      ibizanhound: null,
      plotthound: null,
      walkerhound: null,
      husky: null,
      keeshond: null,
      kelpie: null,
      komondor: null,
      kuvasz: null,
      labrador: null,
      leonberg: null,
      lhasa: null,
      malamute: null,
      malinois: null,
      maltese: null,
      bullmastiff: null,
      englishmastiff: null,
      tibetanmastiff: null,
      mexicanhairless: null,
      mix: null,
      bernesemountain: null,
      swissmountain: null,
      newfoundland: null,
      otterhound: null,
      caucasianovcharka: null,
      papillon: null,
      pekinese: null,
      pembroke: null,
      miniaturepinscher: null,
      pitbull: null,
      germanpointer: null,
      germanlonghairpointer: null,
      pomeranian: null,
      miniaturepoodle: null,
      standardpoodle: null,
      toypoodle: null,
      pug: null,
      puggle: null,
      pyrenees: null,
      redbone: null,
      chesapeakeretriever: null,
      curlyretriever: null,
      flatcoatedretriever: null,
      goldenretriever: null,
      rhodesianridgeback: null,
      rottweiler: null,
      saluki: null,
      samoyed: null,
      schipperke: null,
      giantschnauzer: null,
      miniatureschnauzer: null,
      englishsetter: null,
      gordonsetter: null,
      irishsetter: null,
      englishsheepdog: null,
      shetlandsheepdog: null,
      shiba: null,
      shihtzu: null,
      blenheimspaniel: null,
      brittanyspaniel: null,
      cockerspaniel: null,
      irishspaniel: null,
      japanesespaniel: null,
      sussexspaniel: null,
      welshspaniel: null,
      englishspringer: null,
      stbernard: null,
      americanterrier: null,
      australianterrier: null,
      bedlingtonterrier: null,
      borderterrier: null,
      dandieterrier: null,
      foxterrier: null,
      irishterrier: null,
      kerryblueterrier: null,
      lakelandterrier: null,
      norfolkterrier: null,
      norwichterrier: null,
      patterdaleterrier: null,
      russellterrier: null,
      scottishterrier: null,
      sealyhamterrier: null,
      silkyterrier: null,
      tibetanterrier: null,
      toyterrier: null,
      westhighlandterrier: null,
      wheatenterrier: null,
      yorkshireterrier: null,
      vizsla: null,
      spanishwaterdog: null,
      weimaraner: null,
      whippet: null,
      irishwolfhound: null,
    },
  });
});