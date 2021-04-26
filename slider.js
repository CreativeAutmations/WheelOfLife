// jQuery(document).ready(function($) {
//     $('.range-slider').each(function(index, el) {
//         $(this).append('<span class="range-number"><span>0</span></span>');
//     });
//     $('.range-slider').on('mousedown touchstart', '.range-number', function(event) {
//         event.preventDefault();
//         var $ele = $(this);
//         var $eleParent = $(this).parents('.range-slider');
//         var eleWid = $ele.innerWidth();
//         var eleOffset = 5;
//         var thisEnd = $eleParent.data('end');
//         var parentWid = $eleParent.innerWidth();
//         console.log(event, $ele, $eleParent);
//         $eleParent.addClass('tap');
//         $eleParent.on('mousemove touchmove', function(event) {
//             event.preventDefault();
//             var leftOff = event.offsetX-(eleWid/2);
//             var leftSpc = (leftOff*100)/$eleParent[0].offsetWidth;
//             var leftText = (leftOff + eleOffset * 2) - eleOffset;
//             if(leftOff <= (parentWid-eleWid-eleOffset) && leftOff >= eleOffset){
//                 var temp = parentWid-eleWid-(eleOffset*2);
//                 var temp1 = Math.floor(((leftOff-eleOffset)/temp)*thisEnd);
//                 $ele.css('left', leftSpc+'%');
//                 $ele.find('span').text(temp1);
//             }
//         });
//     });
//     $('.range-slider').on('mouseup touchend', function(event) {
//         event.preventDefault();
//         var $ele = $(this);
//         var $eleParent = $(this).parents('.range-slider');
//         $ele.removeClass('tap');
//         $ele.off('mousemove touchmove');
//     });
// });


$(function() {
    $('.h-rs-line').on('input', function() {
      var val = $(this).val();
      var min = $(this).attr('min');
      var max = $(this).attr('max');
      var portion = (val - min) / (max - min);
      $('.h-rs-indicator').text(val);
      $('.h-rs-indicator').css('left', portion * $('.h-rs-line').width());
    });
  });