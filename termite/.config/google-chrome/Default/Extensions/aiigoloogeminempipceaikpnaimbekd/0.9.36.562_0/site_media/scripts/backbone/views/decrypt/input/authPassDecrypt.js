var AuthPassDecryptView=BaseDecryptInputView.extend({initialize:function(){$('#authUi_password').show();$('#authUis').addClass('auth_type_password');$('#passwordHeader').show();$('#passMetaTips').show();this.$('.toggleMaskIcon').toggleMask({"inputs":$('#decrypt_pword')});},events:{"keyup #decrypt_pword":"handleKeyup"},handleFocus:function(ev){},handleBlur:function(ev){},handleKeyup:function(event){if(event.keyCode==13){$('#getSecret').click();}}});