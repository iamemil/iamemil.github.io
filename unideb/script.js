$('#mySelect').on('change', function (e) {
    var $optionSelected = $("option:selected", this);
    $optionSelected.tab('show')
  });


  $('.unideb-card').click(function() {
    clickToExapndCards($(this));
  });
  
  function clickToExapndCards($obj){
    var clickedElement = $obj;
    if (clickedElement.hasClass('expanded')) {
      clickedElement.find('.card-text').hide('slow');
      clickedElement.removeClass('expanded');
    } else {
       clickedElement.find('.card-text').show('slow');
      clickedElement.addClass('expanded');
    }
    
  };
  