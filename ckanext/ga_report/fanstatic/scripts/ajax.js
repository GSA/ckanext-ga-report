$('select[name="month"]').on('change', function(e) {
    var target = $(e.delegateTarget);
    var form = target.closest('form');
    var url = form.attr('action')+'_'+target.val();
    if(target.val() == "") {
	url = form.attr('action') + '_all_months';
    }
    $.ajax({
      url: url,
      type: "GET",
      success: function(data){
         $(".ajax_container").html(data);
	 if(form.attr('action').indexOf("organization") < 0 && form.attr('action').indexOf("dataset") < 0) { 
	   document.getElementById(last_div + "_click").click();
	 }
      }
   });
});


