ingredients = [];

function addIngredient(){
  ingredient = $('#ingredient').val();
  $('#ingredient').val('');
  amount = $('#amount').val();
  $('#amount').val('');
  ingredients.push([ingredient,amount]);
$('#tbody').append('<tr>\n' +
  '          <td id="column'+ingredients.length+'">'+ingredient+'</td>\n' +
  '          <td>'+amount+'</td>\n' +
  '        </tr>');
}

function calculateFoodprint(){
$('#formingredient').html('<div class="alert alert-info">\n' +
  '  <strong>Your foodprint is:</strong> 15.577.\n' +
  '</div>');
drop = '<ul class="dropdown-menu" aria-labelledby="dropdownMenu1">\n' +
  '        <li class="active"><a href="#">Action</a></li>\n' +
  '        <li><a href="#">Another action</a></li>\n' +
  '        <li><a href="#">Something else here</a></li>\n' +
  '        <li role="separator" class="divider"></li>\n' +
  '        <li><a href="#">Separated link</a></li>\n' +
  '      </ul>';
  for (let i = 0; i < ingredients.length; i++) {
    $('#column'+i).html(drop);
  }
}
