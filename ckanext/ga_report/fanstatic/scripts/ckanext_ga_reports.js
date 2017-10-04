CKAN.GA_Reports.bind_month_selector = function() {
  var handler = function(e) { 
    var target = $(e.delegateTarget);
    var form = target.closest('form');
    var url = form.attr('action')+'?month='+target.val()+window.location.hash;
    window.location = url;
  };
  var selectors = $('select[name="month"]');
  assert(selectors.length>0);
  selectors.bind('change', handler);
};
