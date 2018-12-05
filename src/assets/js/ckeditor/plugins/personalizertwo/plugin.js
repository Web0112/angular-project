CKEDITOR.plugins.add( 'personalizertwo',
{   
   requires : ['richcombo'], //, 'styles' ],
   init : function( editor )
   {
      var config = editor.config,
         lang = editor.lang.format;

      // Gets the list of tags from the settings.
      var tags = []; //new Array();
      //this.add('value', 'drop_text', 'drop_label');
       tags[0]=["%Subscriber:FirstName%", "Subscriber First Name", ""];
       tags[1]=["%Subscriber:LastName%", "Subscriber Last Name", ""];
       tags[2]=["%Subscriber:LastName%", "Subscriber Email Address", ""];

      /*
      tags[0]=["%Subscriber:BounceType%", "Bounce Type", ""];
      tags[1]=["%Subscriber:CustomField3%", "Custom Field: ADDRESS (Global)", ""];

      tags[2]=["%Subscriber:CustomField4%", "Custom Field: CITY (Global)", ""];
	  tags[3]=["%Subscriber:CustomField12%", "Custom Field: DOB (Global)", ""];
	  tags[4]=["%Subscriber:CustomField1%", "Custom Field: FNAME (Global)", ""];
	  tags[5]=["%Subscriber:CustomField11%", "Custom Field: GENDER (Global)", ""];
	  tags[6]=["%Subscriber:CustomField13%", "Custom Field: HOME_OWNER (Global)", ""];
	  tags[7]=["%Subscriber:CustomField9%", "Custom Field: IP (Global)", ""];
	  tags[8]=["%Subscriber:CustomField10%", "Custom Field: JOIN_DATE (Global)", ""];
	  tags[9]=["%Subscriber:CustomField2%", "Custom Field: LNAME (Global)", ""];
	  tags[10]=["%Subscriber:CustomField7%", "Custom Field: PHONE (Global)", ""];
	  tags[11]=["%Subscriber:CustomField5%", "Custom Field: STATE (Global)", ""];
	  tags[12]=["%Subscriber:CustomField8%", "Custom Field: URL (Global)", ""];
	  tags[13]=["%Subscriber:CustomField6%", "Custom Field: ZIP (Global)", ""];
	  tags[14]=["%Subscriber:EmailAddress%", "EmailAddress", ""];
	  tags[15]=["%Subscriber:EmailAddressHash%", "EmailAddressHash", ""];
	  tags[16]=["%Subscriber:OptInDate%", "Opt-In Date", ""];
	  tags[17]=["%Subscriber:SubscriberID%", "Subscriber ID", ""];
	  tags[18]=["%Subscriber:SubscriptionDate%", "Subscription date", ""];
	  tags[19]=["%Subscriber:SubscriptionIP%", "Subscription IP", ""];
	  tags[20]=["%Subscriber:SubscriptionStatus%", "Subscription status", ""];
	  tags[21]=["%Subscriber:Suppressed%", "Suppressed", ""];
	  tags[22]=["%Subscriber:UnsubscriptionDate%", "Unsubscription date", ""];
	  tags[23]=["%Subscriber:UnsubscriptionIP%", "Unsubscription IP", ""];
	  tags[24]=["%Subscriber:isClicker%", "isClicker", ""];
	  tags[25]=["%Subscriber:isDeliverable%", "isDeliverable", ""];
	  tags[26]=["%Subscriber:isOpener%", "isOpener", ""];
	  tags[27]=["[condition1<>condition2,true_value,false_value]", "Conditional Personalization", ""];
	  */
	  /*
      tags[28]=["%Link:Forward%", "Fordward to friend link", ""];
	  tags[29]=["%Link:WebBrowser%", "View in web browser link", ""];
	  tags[30]=["%Link:ReportAbuse%", "Report abuse link", ""];
	  tags[31]=["%Link:SocialShare:Twitter%", "Twitter share link", ""];
	  tags[32]=["%Link:SocialShare:Facebook%", "Facebook share link", ""];
	  tags[33]=["%RemoteContent=http://%", "Remote content", ""];
	  */
	  tags[34]=["<a href='%Link:Unsubscribe%'>Usubscribe Here</a>", "Unsubscription link", ""];
	  /*
      tags[35]=["%Link:SubscriberArea%", "Subscriber area link", ""];
	  tags[36]=["%List:ID%", "List ID", ""];
	  tags[37]=["%List:Name%", "List name", ""];
	  tags[38]=["%User:FirstName%", "First name", ""];
	  tags[39]=["%User:LastName%", "Last name", ""];
	  tags[40]=["%User:EmailAddress%", "Email Address", ""];
	  tags[41]=["%User:CompanyName%", "Company name", ""];
	  tags[42]=["%User:Website%", "Website URL", ""];
	  tags[43]=["%User:Street%", "Street", ""];
	  tags[44]=["%User:City%", "City", ""];
	  tags[45]=["%User:State%", "State", ""];
	  tags[46]=["%User:Zip%", "ZIP", ""];
	  tags[47]=["%User:Country%", "Country", ""];
	  tags[48]=["%User:Phone%", "Phone", ""];
	  tags[49]=["%User:Fax%", "Fax", ""];
	  tags[50]=["%User:TimeZone%", "Time zone", ""];*/
	  tags[51]=["%Date=...%", "Email delivery date", ""];
	  tags[52]=["###DATE###", "Email send date", ""];
	  tags[53]=["###LONGDATE###", "Email send long date", ""];
	  tags[54]=["###DATEY###", "Email send date year", ""];
	  tags[55]=["###LONGDATEY###", "Email send long date year", ""];
	  tags[56]=["###TIME###", "Email send time", ""];
	  //tags[57]=["[SFNAME]", "Email user of the recipient", ""];
	  tags[58]=["###CHK_SUM###", "Email Address check sum", ""];
	  tags[58]=["###FROMEMAIL###", "User Name From Email Address of recipient", ""];

      // Create style objects for all defined styles.
	  
      /*
       editor.ui.addRichCombo( 'personalizertwo',
         {
            label : "Variables",
            title :"Variables",
            voiceLabel : "Add personalized content",
            className : 'cke_format',
            multiSelect : false,

            panel :
            {
               css : [ config.contentsCss, CKEDITOR.getUrl( editor.skinPath + 'editor.css' ) ],
               voiceLabel : lang.panelVoiceLabel
            },

            init : function()
            {
               //this.startGroup( "Tokens" );
               //this.add('value', 'drop_text', 'drop_label');
               for (var this_tag in tags){
                  this.add(tags[this_tag][0], tags[this_tag][1], tags[this_tag][2]);
               }
            },

            onClick : function( value )
            {         
               editor.focus();
               editor.fire( 'saveSnapshot' );
               editor.insertHtml(value);
               editor.fire( 'saveSnapshot' );
            }
         });*/
   }
});
