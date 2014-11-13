var AuthPhoneView=BaseEncryptInputView.extend({defaults:{MAX_PHONE_NUMBERS:5},events:{"click #add_another_phone_number":"handleAdd","keyup #add_another_phone_number":"handleAddKeyup","change input.phone_number":"handleChange","click .removePhone":"handleRemovePhone","mouseenter .removePhone":"handleRemovePhoneEnter","mouseleave .removePhone":"handleRemovePhoneLeave"},initialize:function(options){this.options=$.extend({},this.defaults,options);$('input.phone_number').phoneNumber();_.bindAll(this,['reset']);$(document).bind('formReset',this.reset);this.model.bind("validationError",this.handleValidationError);},handleAdd:function(event){if($('input.phone_number').length>=this.options.MAX_PHONE_NUMBERS){return false;}
$('div.phoneRow:last').after($('div.phoneRow:last').clone());$('div.phoneRow:last').find('input').removeClass('validationError').val('').phoneNumber().focus();$('div.phoneRow:last').find('.prependItem').removeClass('validationError');$('div.phoneRow').find('.removePhone').show();if($('input.phone_number').length==this.options.MAX_PHONE_NUMBERS){$(event.currentTarget).hide();}
lockifyUtils.setupQtips('.removePhone',{my:'left middle',at:'right middle'});this.trigger('handleChange');return false;},handleAddKeyup:function(event){if(event.keyCode==13||event.keyCode==32){$(event.target).click();}},handleChange:function(){this.model.set({authMethod:"phone",userids:$.makeArray($('input.phone_number').map(function(){return $(this).phoneNumberVal()||'';}))});},handleRemovePhone:function(event){$('.removePhone').qtip('hide');$('#add_another_phone_number').show();$(event.target).parents('div.phoneRow').remove();if($('input.phone_number').length==1){$('.removePhone').hide();}
return false;},handleRemovePhoneEnter:function(event){$(event.target).prev('input').addClass('hover');},handleRemovePhoneLeave:function(event){$(event.target).prev('input').removeClass('hover');},reset:function(){$('.removePhone:not(:first)').click();$('input.phone_number').val('').blur();},handleValidationError:function(type,msg,elemIndex){var arrErrorMessage=[];$("#authOptionPhone_errors").find('span').each(function(index,elem){arrErrorMessage.push($(this).text());});if(jQuery.inArray(msg,arrErrorMessage)<=-1){if(type==='phone'){var elemsToHilight;if(elemIndex){elemsToHilight=$('.phoneRow input.phone_number').eq(elemIndex);}else{elemsToHilight=$('.phoneRow input.phone_number');}
AuthPhoneView.__super__.appendError($("#authOptionPhone_errors"),msg,elemsToHilight);$(elemsToHilight).prev('.prependItem').addClass('validationError');}}}});