var joinForm;
var joinClick = function () {
    $s("join").blur();
    if ( joinForm.validateForm(true) ) {
        //alert("Please correct the errors on the page.");
    } else {
        document.location.href = '#top';
        $s("feedback").focus();
        //window.setTimeout( function(){
        //    window.location.href="login.html?login="+$s("username").value+"&password="+$s("password").value;
        //    },5000
        //);
    }
}

var checkARIAErrors = function () {
	console.log("checkErrors");
	var error_count = 0;
	for ( var fieldName in joinForm.fields ) {
		if ($s(fieldName + "_error").classList.contains("error") && error_count === 0) {  //If _error div has the error class applied, then we've found at least one error, revalidate the form.
			joinForm.validateForm(false);
			error_count++;
		}
	}
}

var resetClick = function () {
    $s("reset_form").blur();
    $s("join_form").reset();
    $s("feedback").style.display = "none";
    joinForm.resetErrors();
}
// Toggle between province/post and state/zip fields
var setCountry = function(){
	if($s("country").value == "usa"){
	    hideBlock("prov_block");
	    showBlock("state_block");
		$s("province").value = "";
        $s("postal").value = "";
	}else if($s("country").value == "ca"){
	    hideBlock("state_block");
	    showBlock("prov_block")
	    $s("state").value = "";
        $s("zip").value = "";
	}
}
var hideBlock = function(className){
    var elements = document.getElementsByClassName(className);
    for(var i = 0, length = elements.length; i < length; i++) {
          elements[i].style.display = 'none';
    }
  }
var showBlock = function(className){
    var elements = document.getElementsByClassName(className);
    for(var i = 0, length = elements.length; i < length; i++) {
          elements[i].style.display = 'inline';
    }
  }

window.onload = function () {
    if($s("country").value == ''){ 
            $s("country").value = "usa";
    }
    setCountry(); 
    joinForm = new JoinForm();
    joinForm.setMessages();
    $s("country").onchange = setCountry;
    $s("join").onclick = joinClick;
    $s("reset_form").onclick = resetClick;
	$s("username").onblur = checkARIAErrors;
	$s("password").onblur = checkARIAErrors;
	$s("email").onblur = checkARIAErrors;
    
    var a = document.getElementsByClassName("fake");
    for(i=0 ; i<a.length ; i++){
        a[i].addEventListener('click', function(e) {
            if (this.href === window.location.href) {
                e.preventDefault();
                alert("fake link");
            }
        });
    } 
}