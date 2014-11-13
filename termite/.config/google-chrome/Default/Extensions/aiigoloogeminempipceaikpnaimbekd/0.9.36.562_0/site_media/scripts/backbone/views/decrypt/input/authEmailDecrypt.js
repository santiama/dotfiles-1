var AuthEmailDecryptView=InitiateOtpDecryptView.extend({defaults:{showOnStart:true},events:{"click #emailButton":"handleClick","focus #emailAuthMultiFactorCode":"handleFocus","blur #emailAuthMultiFactorCode":"handleBlur","keyup #emailAuthMultiFactorCode":"handleKeyUp","input #emailAuthMultiFactorCode":"handleKeyUp","keydown #email":"handleEmailKeyDown","keyup #email":"handleEmailKeyUp","paste #email":"handleEmailKeyUp","cut   #email":"handleEmailKeyUp","input #email":"handleEmailKeyUp","click #emailBackButton":"handleGoBack","click #noEmailHelp":"handleNoEmailHelp","click .send_again":"handleGoBack"},initialize:function(options){this.options=$.extend({},this.defaults,options);if(this.options.showOnStart){$('#authUi_email').show();}else{AuthEmailDecryptView.__super__.bind('otpRequestComplete',function(){$('#authUi_email').show();});}
$('#emailHeader').show();$('#back_email_button').hide();$('.openid_service_name').text('email');$('#openidMetaTips').show();_.bindAll(this,['handleKeyUp']);AuthEmailDecryptView.__super__.finishInstructionText(this.options.json,this.options.auth_infoKey,$('#validEmails'));if($('#validEmails').children().hasClass('multipleValueIds')){$('.one').hide();$('.status .multiple').show();$('.status .single').hide();}else{$('.status .multiple').hide();$('.status .single').show();}
$('#authUis').addClass('auth_type_email');if(this.options.json.userids_aes256){$('#email').data('masks',lockify.sjclBridge.decrypt.decrypts(this.options.json.userids_aes256,this.options.auth_infoKey));}
this.bind('handleClick',this.handleClick);$('.emailRecipient').text($('#integratedemail').val());$('#emailAuthMultiFactorCode').keyfilter(/[0-9]/).bind('filtered',function(){$(this).addClass('validationError');});var expr=new RegExp("["+lockifyUtils.emailChars+"]",'i');$('.emailInputContainer #email').keyfilter(expr).bind('filtered',function(){$(this).addClass('validationError');});this.options.shortestMaskLength=_.reduce($('#email').data('masks').split(','),function(memo,value){if(value.length<memo){memo=value.length;}
return memo;},255);this.options.longestMaskLength=_.reduce($('#email').data('masks').split(','),function(memo,value){if(value.length>memo){memo=value.length;}
return memo;},0);$('#getSecret').insertAfter($('#emailAuthMultiFactorCode')).addClass('disabled').prop('disabled',true);AuthPhoneDecryptView.__super__.showOtpError=this.showOtpError;},handleClick:function(){this.options.lastValAttempt=$('#email').val();$('.emailRecipient').text($('#email').val());$('#back_email_button').hide();var key=AuthEmailDecryptView.__super__.setChannel('email').initiateOtp();return false;},handleFocus:function(){AuthEmailDecryptView.__super__.handleFocus();},handleBlur:function(){AuthEmailDecryptView.__super__.handleBlur();},handleKeyUp:function(e){var el=$(e.currentTarget);if(el.val().length==$('#emailAuthMultiFactorCode').data('maxlength')){this.options.json.auth_type="email";$('#getSecret').prop('disabled',false).removeClass('disabled');}else{$('#getSecret').prop('disabled',true).addClass('disabled');$('.error').hide();}
if(e.keyCode==13){if($('#getSecret').is(':visible')){$('#getSecret').click();}}
$(el).removeClass('validationError');},handleEmailKeyUp:function(e){var el=$(e.currentTarget);if(el.val()!=this.options.lastValAttempt){$('#emailInputError').hide();}
var allow_partial=el.val().length<this.options.longestMaskLength;var matchIndex=lockifyUtils.matchesWhichMask(el.val(),el.data('masks').split(','),allow_partial);if(matchIndex>-1){$('#maskMismatchEmail').hide();$('#email').removeClass('validationError');if(el.val().length>=$.trim(el.data('masks').split(',')[matchIndex]).length){$('#email_auth_button button').removeClass('disabled').prop('disabled',false);}
else{$('#email_auth_button button').addClass('disabled').prop('disabled',true);}}else{$('#maskMismatchEmail').show();$('#email').addClass('validationError');$('#email_auth_button button').addClass('disabled').prop('disabled',true);}},handleEmailKeyDown:function(e){if(e.keyCode==13){return false;}},handleNoEmailHelp:function(e){var el=$(e.currentTarget);el.parent().toggle();el.parent().siblings('div').show();},handleGoBack:function(){$('#emailHeader-action').hide();$('#emailHeader').show();$('#methodMetaTips').show();if(this.options.showOnStart){$('#multiFactorCode_email').hide();$('#multiFactorInitiateEmail').show();}else{$('#authUi_integratedemail').show();$('#multiFactorCode_email').hide();$('#emailAuthMultiFactorCode').val('');$('#back_email_button').hide();$('#noEmailHelp').show();$('#noEmailHelp').next('span').hide();$('#authUi_email').hide();$('#notYoursButtons').hide();$('.error').hide();$('#back_phone_button').hide();$('.noContactLink').show();$('.noContactLink').next('span').hide();}},showOtpError:function(message){$('#emailInputError').html(new Showdown.converter().makeHtml(message)).show();$('#email').addClass('validationError').focus();$('#multiFactorInitiateEmail').show();}});