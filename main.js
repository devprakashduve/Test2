"use strict";
let pages = {
    home: '',
    shop: '<div class="col-lg-6 col-md-6 mb-4">shop page</div>',
    magazine: '<div class="col-lg-6 col-md-6 mb-4">magazine page</div>',
    login: "<div class='col-lg-8 col-md-12'><form><div class='form-group'><label for='exampleDropdownFormEmail2'>Email address</label><input type='email' class='form-control' id='exampleDropdownFormEmail2' placeholder='email@example.com'></div><div class='form-group'><label for='exampleDropdownFormPassword2'>Password</label><input type='password' class='form-control' id='exampleDropdownFormPassword2' placeholder='Password'></div><div class='form-check'><input type='checkbox' class='form-check-input' id='dropdownCheck2'><label class='form-check-label' for='dropdownCheck2'>Remember me</label></div><button type='submit' class='btn btn-primary'>Sign in</button></form></div>",
    signup: "<div class='col-lg-8 col-md-12'><form><div><label for='exampleDropdownFormEmail2'>Email address</label><input type='email' class='form-control' id='Name' placeholder='Name'></div><div class='form-group'><label for='name'>Name</label><input type='text' class='form-control' id='name' placeholder='your name'></div><div class='form-group'><label for='exampleDropdownFormPassword2'>Password</label><input type='password' class='form-control' id='exampleDropdownFormPassword2' placeholder='Password'></div><div class='form-check'><input type='checkbox' class='form-check-input' id='dropdownCheck2'><label class='form-check-label' for='dropdownCheck2'>Remember me</label></div><button type='submit' class='btn btn-primary'>Sign in</button></form></div>",
    detail: ''
};
 const href = window.location.href;
function getContent(fragmentId, callback) {
	     callback(pages[fragmentId]);
}

function loadContent() {
	// check the page to load content
	

    let contentDiv = document.getElementById("app"),
        fragmentId = location.hash.substr(1);
       getContent(fragmentId, function(content) {
      contentDiv.innerHTML='';
    	if (content!=undefined) {
        contentDiv.innerHTML = content;
    }/*else{ window.location.reload()}*/

    });
    if (location.hash == "#home") {

        $.ajax({
            url: "http://localhost/deloitte_test/product.json",
            success: function(result) {
                $.each(result, function(i, field) {
                    let userRating = '';
                    for (i = 1; i <= 5; i++) {if (i <= field.user.rating) {    userRating += '&#9733; ';} else {    userRating += '&#9734; ';}
                    }
                   $("#app").append('<div class="col-lg-4 col-md-6 mb-4"><div class="card h-100"><a href="?item=' + field.prod_name + '#detail"><img class="card-img-top" src="' + field.prod_img + '" alt=""></a><div class="card-body"><p class="text-muted"><h6 >' + field.prod_name + '</h6></p><div><small class="text-muted">' + field.category + '</small><small class="text-muted2">' + field.price + '</small></div></div><div class="card-footer">  <small class="text-muted">' + userRating + ' </small><small class="text-muted2"><i class="material-icons">&#xe854;</i></small></div></div></div>');

                });
            }
        });

    }


    if (location.hash == "#detail") {
    	const href=window.location.href;
	const page=href.split('?'); 
	
        if (page[1] && page[1] !== '') {    
        const parts = page[1].split('=');
        var itemname = parts[1].replace('#detail','');
        console.log(itemname); 
        }
        $.ajax({
            url: "http://localhost/deloitte_test/product.json",
            success: function(result) {
                $.each(result, function(i, field) {
         if (field.prod_name==itemname) {
                    $("#app").append('<div class="container my-4"><div class="row"><div class="col-lg-6 col-lg-6">        <!--Carousel Wrapper-->        <div id="carousel-thumb" class="carousel slide carousel-fade carousel-thumbnails" data-ride="carousel"><!--Slides--><div class="carousel-inner" role="listbox">    <div class="carousel-item active"><img class="d-block w-100" src="' + field.prod_img + '" alt="First slide"> </div>    <div class="carousel-item active"><img class="d-block w-100" src="' + field.prod_img + '" alt="First slide"> </div>    <div class="carousel-item active"><img class="d-block w-100" src="' + field.prod_img + '" alt="First slide"> </div></div><!--/.Slides--><!--Controls--><a class="carousel-control-prev" href="#carousel-thumb" role="button" data-slide="prev"> <span class="carousel-control-prev-icon" aria-hidden="true"></span> <span class="sr-only">Previous</span></a><a class="carousel-control-next" href="#carousel-thumb" role="button" data-slide="next"> <span class="carousel-control-next-icon" aria-hidden="true"></span> <span class="sr-only">Next</span></a><!--/.Controls--><br><br><ol class="carousel-indicators">    <li data-target="#carousel-thumb" data-slide-to="0" class="active"> <img class="d-block w-100" src="' + field.prod_img + '" class="img-fluid"></li>    <li data-target="#carousel-thumb" data-slide-to="1"><img class="d-block w-100" src="https://mdbootstrap.com/img/Photos/Others/Carousel-thumbs/img%20(121).jpg" class="img-fluid"></li>    <li data-target="#carousel-thumb" data-slide-to="2"><img class="d-block w-100" src="https://mdbootstrap.com/img/Photos/Others/Carousel-thumbs/img%20(31).jpg" class="img-fluid"></li></ol>        </div>    </div>    <div class="col-lg-6 col-lg-6">        <div class="text-muted">' + field.brand_name + '</div><br>        <div class="text-justify text-left"><h4>' + field.prod_name + '</h4><p class="">' + field.description + '</p><hr class="my-4"><p>    <div class="text-muted">color</div><br>   <div><button class="color" style="background-color: #000;"><button class="color" style="background-color: red;"></button></div></p><hr class="my-4"><p>    <div class="text-muted">Price per unit</div><br>    <div class="h4 float-left">' + field.price + '</div></p><button type="button" class="btn-lg bg-light float-right">Buy Now <i class="material-icons">&#xe854;</i></button></strong></p>        </div>    </div></div><!--/.Carousel Wrapper--> </div>');
               }
                });

            }
        });
    }
}
if (!location.hash) {
    location.hash = "#home";
}
loadContent();
window.addEventListener("hashchange", loadContent);
let acc = document.getElementsByClassName("accordion");
let i;
for (i = 0; i < acc.length; i++) {
    acc[i].addEventListener("click", function() {
        this.classList.toggle("active");
        let panel = this.nextElementSibling;
        if (panel.style.maxHeight) {
            panel.style.maxHeight = null;
        } else {
            panel.style.maxHeight = panel.scrollHeight + "px";
        }
    });
}



  

//Api call