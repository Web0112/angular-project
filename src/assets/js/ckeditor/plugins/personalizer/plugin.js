CKEDITOR.plugins.add( 'personalizer', {
	icons: 'personalizer',

	init: function( editor ) {

        editor.addCommand( 'c1', {
            exec: function( editor ) {
                editor.insertHtml( '%Subscriber:FirstName%' );
            }
        });

        editor.addCommand( 'c2', {
            exec: function( editor ) {
                editor.insertHtml( '%Subscriber:LastName%' );
            }
        });

        editor.addCommand( 'c3', {
            exec: function( editor ) {
                editor.insertHtml( '%Subscriber:EmailAddress%' );
            }
        });

        editor.addCommand( 'c4', {
            exec: function( editor ) {
                editor.insertHtml( '%Subscriber:FullName%' );
            }
        });

        editor.addCommand( 'c5', {
            exec: function( editor ) {
                editor.insertHtml( '%Subscriber:Age%' );
            }
        });

        editor.addCommand( 'c6', {
            exec: function( editor ) {
                editor.insertHtml( '%Subscriber:Username%' );
            }
        });

        editor.addCommand( 'c7', {
            exec: function( editor ) {
                editor.insertHtml( '%Subscriber:Address%' );
            }
        });

        editor.addCommand( 'c8', {
            exec: function( editor ) {
                editor.insertHtml( '%Subscriber:State%' );
            }
        });

        editor.addCommand( 'c9', {
            exec: function( editor ) {
                editor.insertHtml( '%Subscriber:City%' );
            }
        });

        editor.addCommand( 'c10', {
            exec: function( editor ) {
                editor.insertHtml( '%Subscriber:Country%' );
            }
        });

        editor.addCommand( 'c11', {
            exec: function( editor ) {
                editor.insertHtml( '%Subscriber:Zip%' );
            }
        });


		/*
        editor.addCommand( 'c1', {
			exec: function( editor ) {
				editor.insertHtml( '%Subscriber:BounceType%' );
			}
		});
		
		editor.addCommand( 'c2', {
			exec: function( editor ) {
				editor.insertHtml( '%Subscriber:CustomField3%' );
			}
		});
		
		editor.addCommand( 'c3', {
			exec: function( editor ) {
				editor.insertHtml( '%Subscriber:CustomField4%' );
			}
		});
		
		editor.addCommand( 'c4', {
			exec: function( editor ) {
				editor.insertHtml( '%Subscriber:CustomField12%' );
			}
		});
		
		editor.addCommand( 'c5', {
			exec: function( editor ) {
				editor.insertHtml( '%Subscriber:CustomField1%' );
			}
		});
		
		editor.addCommand( 'c6', {
			exec: function( editor ) {
				editor.insertHtml( '%Subscriber:CustomField11%' );
			}
		});
		
		editor.addCommand( 'c7', {
			exec: function( editor ) {
				editor.insertHtml( '%Subscriber:CustomField13%' );
			}
		});
		
		editor.addCommand( 'c8', {
			exec: function( editor ) {
				editor.insertHtml( '%Subscriber:CustomField9%' );
			}
		});
		
		editor.addCommand( 'c9', {
			exec: function( editor ) {
				editor.insertHtml( '%Subscriber:CustomField10%' );
			}
		});
		
		editor.addCommand( 'c10', {
			exec: function( editor ) {
				editor.insertHtml( '%Subscriber:CustomField2%' );
			}
		});
		
		editor.addCommand( 'c11', {
			exec: function( editor ) {
				editor.insertHtml( '%Subscriber:CustomField7%' );
			}
		});
		
		editor.addCommand( 'c12', {
			exec: function( editor ) {
				editor.insertHtml( '%Subscriber:CustomField5%' );
			}
		});
		
		editor.addCommand( 'c13', {
			exec: function( editor ) {
				editor.insertHtml( '%Subscriber:CustomField8%' );
			}
		});
		
		editor.addCommand( 'c14', {
			exec: function( editor ) {
				editor.insertHtml( '%Subscriber:CustomField6%' );
			}
		});
		
		editor.addCommand( 'c15', {
			exec: function( editor ) {
				editor.insertHtml( '%Subscriber:EmailAddress%' );
			}
		});
		
		editor.addCommand( 'c16', {
			exec: function( editor ) {
				editor.insertHtml( '%Subscriber:EmailAddressHash%' );
			}
		});
		
		editor.addCommand( 'c17', {
			exec: function( editor ) {
				editor.insertHtml( '%Subscriber:OptInDate%' );
			}
		});
		
		editor.addCommand( 'c18', {
			exec: function( editor ) {
				editor.insertHtml( '%Subscriber:SubscriberID%' );
			}
		});
		
		editor.addCommand( 'c19', {
			exec: function( editor ) {
				editor.insertHtml( '%Subscriber:SubscriptionDate%' );
			}
		});
		
		editor.addCommand( 'c20', {
			exec: function( editor ) {
				editor.insertHtml( '%Subscriber:SubscriptionIP%' );
			}
		});
		
		editor.addCommand( 'c21', {
			exec: function( editor ) {
				editor.insertHtml( '%Subscriber:SubscriptionStatus%' );
			}
		});
		
		editor.addCommand( 'c22', {
			exec: function( editor ) {
				editor.insertHtml( '%Subscriber:Suppressed%' );
			}
		});
		
		editor.addCommand( 'c23', {
			exec: function( editor ) {
				editor.insertHtml( '%Subscriber:UnsubscriptionDate%' );
			}
		});
		
		editor.addCommand( 'c24', {
			exec: function( editor ) {
				editor.insertHtml( '%Subscriber:UnsubscriptionIP%' );
			}
		});
		
		editor.addCommand( 'c25', {
			exec: function( editor ) {
				editor.insertHtml( '%Subscriber:isClicker%' );
			}
		});
		
		editor.addCommand( 'c26', {
			exec: function( editor ) {
				editor.insertHtml( '%Subscriber:isDeliverable%' );
			}
		});
		
		editor.addCommand( 'c27', {
			exec: function( editor ) {
				editor.insertHtml( '%Subscriber:isOpener%' );
			}
		});
		*/

        /*
		editor.addCommand( 'c28', {
			exec: function( editor ) {
				editor.insertHtml( '[condition1<>condition2,true_value,false_value]' );
			}
		});
		
		editor.addCommand( 'c29', {
			exec: function( editor ) {
				editor.insertHtml( '%Link:Forward%' );
			}
		});
		
		editor.addCommand( 'c30', {
			exec: function( editor ) {
				editor.insertHtml( '%Link:WebBrowser%' );
			}
		});
		
		editor.addCommand( 'c31', {
			exec: function( editor ) {
				editor.insertHtml( '%Link:ReportAbuse%' );
			}
		});
		
		editor.addCommand( 'c32', {
			exec: function( editor ) {
				editor.insertHtml( '%Link:SocialShare:Twitter%' );
			}
		});
		
		editor.addCommand( 'c33', {
			exec: function( editor ) {
				editor.insertHtml( '%Link:SocialShare:Facebook%' );
			}
		});
		
		editor.addCommand( 'c34', {
			exec: function( editor ) {
				editor.insertHtml( '%RemoteContent=http://%' );
			}
		});*/
		

        editor.addCommand( 'c35', {
			exec: function( editor ) {
				editor.insertHtml( '<a href="%Link:Unsubscribe%">Unsubscribe Here</a>' );
			}
		});


		/*
		editor.addCommand( 'c36', {
			exec: function( editor ) {
				editor.insertHtml( '%Link:SubscriberArea%' );
			}
		});
		
		editor.addCommand( 'c37', {
			exec: function( editor ) {
				editor.insertHtml( '%List:ID%' );
			}
		});
		
		editor.addCommand( 'c38', {
			exec: function( editor ) {
				editor.insertHtml( '%List:Name%' );
			}
		});
		
		editor.addCommand( 'c39', {
			exec: function( editor ) {
				editor.insertHtml( '%User:FirstName%' );
			}
		});
		
		editor.addCommand( 'c40', {
			exec: function( editor ) {
				editor.insertHtml( '%User:LastName%' );
			}
		});
		
		editor.addCommand( 'c41', {
			exec: function( editor ) {
				editor.insertHtml( '%User:EmailAddress%' );
			}
		});
		
		editor.addCommand( 'c42', {
			exec: function( editor ) {
				editor.insertHtml( '%User:CompanyName%' );
			}
		});
		
		editor.addCommand( 'c43', {
			exec: function( editor ) {
				editor.insertHtml( '%User:Website%' );
			}
		});
		
		editor.addCommand( 'c44', {
			exec: function( editor ) {
				editor.insertHtml( '%User:Street%' );
			}
		});
		
		editor.addCommand( 'c45', {
			exec: function( editor ) {
				editor.insertHtml( '%User:City%' );
			}
		});
		
		editor.addCommand( 'c46', {
			exec: function( editor ) {
				editor.insertHtml( '%User:State%' );
			}
		});
		
		editor.addCommand( 'c47', {
			exec: function( editor ) {
				editor.insertHtml( '%User:Zip%' );
			}
		});
		
		editor.addCommand( 'c48', {
			exec: function( editor ) {
				editor.insertHtml( '%User:Country%' );
			}
		});
		
		editor.addCommand( 'c49', {
			exec: function( editor ) {
				editor.insertHtml( '%User:Phone%' );
			}
		});
		
		editor.addCommand( 'c50', {
			exec: function( editor ) {
				editor.insertHtml( '%User:Fax%' );
			}
		});
		
		editor.addCommand( 'c51', {
			exec: function( editor ) {
				editor.insertHtml( '%User:TimeZone%' );
			}
		});
		*/
		editor.addCommand( 'c52', {
			exec: function( editor ) {
				editor.insertHtml( '%Date=...%' );
			}
		});
		
		editor.addCommand( 'c53', {
			exec: function( editor ) {
				editor.insertHtml( '###DATE###' );
			}
		});
		
		editor.addCommand( 'c54', {
			exec: function( editor ) {
				editor.insertHtml( '###LONGDATE###' );
			}
		});
		
		editor.addCommand( 'c55', {
			exec: function( editor ) {
				editor.insertHtml( '###DATEY###' );
			}
		});
		
		editor.addCommand( 'c56', {
			exec: function( editor ) {
				editor.insertHtml( '###LONGDATEY###' );
			}
		});
		
		editor.addCommand( 'c57', {
			exec: function( editor ) {
				editor.insertHtml( '###TIME###' );
			}
		});
		
		/*editor.addCommand( 'c58', {
			exec: function( editor ) {
				editor.insertHtml( '[SFNAME]' );
			}
		});*/

        editor.addCommand( 'c59', {
            exec: function( editor ) {
                editor.insertHtml( '###CHK_SUM###' );
            }
        });

		/*editor.ui.addButton( 'Personalizer', {


			label: 'Personalize',
			command: 'abbr',
			toolbar: 'insert'
		});*/

if (editor.addMenuItems) {
  editor.addMenuGroup('g1', 3);
  //editor.addMenuGroup('g2', 4);
  editor.addMenuGroup('g3', 5);
  //editor.addMenuGroup('g4', 6);
  //editor.addMenuGroup('g5', 7);
  editor.addMenuGroup('g6', 8);

  editor.addMenuItems({
      g1 :
      {
        label : 'Subscriber information',
        group : 'g1',
        getItems : function() {
          return {
            i11 : CKEDITOR.TRISTATE_OFF, 
            i12 : CKEDITOR.TRISTATE_OFF,
            i13 : CKEDITOR.TRISTATE_OFF,
			i14 : CKEDITOR.TRISTATE_OFF,
			i15 : CKEDITOR.TRISTATE_OFF,
			i16 : CKEDITOR.TRISTATE_OFF,
			i17 : CKEDITOR.TRISTATE_OFF,
			i18 : CKEDITOR.TRISTATE_OFF,
			i19 : CKEDITOR.TRISTATE_OFF,
			i110 : CKEDITOR.TRISTATE_OFF,
			i111 : CKEDITOR.TRISTATE_OFF,
			i112 : CKEDITOR.TRISTATE_OFF,
			i113 : CKEDITOR.TRISTATE_OFF,
			i114 : CKEDITOR.TRISTATE_OFF,
			i115 : CKEDITOR.TRISTATE_OFF,
			i116 : CKEDITOR.TRISTATE_OFF,
			i117 : CKEDITOR.TRISTATE_OFF,
			i118 : CKEDITOR.TRISTATE_OFF,
			i119 : CKEDITOR.TRISTATE_OFF,
			i120 : CKEDITOR.TRISTATE_OFF,
			i121 : CKEDITOR.TRISTATE_OFF,
			i122 : CKEDITOR.TRISTATE_OFF,
			i123 : CKEDITOR.TRISTATE_OFF,
			i124 : CKEDITOR.TRISTATE_OFF,
			i125 : CKEDITOR.TRISTATE_OFF,
			i126 : CKEDITOR.TRISTATE_OFF,
			i127 : CKEDITOR.TRISTATE_OFF,
			i128 : CKEDITOR.TRISTATE_OFF
          };
        }
      },
	  
	  g2 :
      {
        label : 'Campaign links',
        group : 'g2',
        getItems : function() {
          return {
            i21 : CKEDITOR.TRISTATE_OFF,
            i22 : CKEDITOR.TRISTATE_OFF,
            i23 : CKEDITOR.TRISTATE_OFF,
			i24 : CKEDITOR.TRISTATE_OFF,
			i25 : CKEDITOR.TRISTATE_OFF,
			i26 : CKEDITOR.TRISTATE_OFF
          };
        }
      },
	  
	  g3 :
      {
        label : 'List links',
        group : 'g3',
        getItems : function() {
          return {
            i31 : CKEDITOR.TRISTATE_OFF,
            i32 : CKEDITOR.TRISTATE_OFF
          };
        }
      },
	  
	  g4 :
      {
        label : 'List information',
        group : 'g4',
        getItems : function() {
          return {
            i41 : CKEDITOR.TRISTATE_OFF,
            i42 : CKEDITOR.TRISTATE_OFF
          };
        }
      },
	  
	  g5 :
      {
        label : 'User information',
        group : 'g5',
        getItems : function() {
          return {
            i51 : CKEDITOR.TRISTATE_OFF,
            i52 : CKEDITOR.TRISTATE_OFF,
			i53 : CKEDITOR.TRISTATE_OFF,
			i54 : CKEDITOR.TRISTATE_OFF,
			i55 : CKEDITOR.TRISTATE_OFF,
			i56 : CKEDITOR.TRISTATE_OFF,
			i57 : CKEDITOR.TRISTATE_OFF,
			i58 : CKEDITOR.TRISTATE_OFF,
			i59 : CKEDITOR.TRISTATE_OFF,
			i510 : CKEDITOR.TRISTATE_OFF,
			i511 : CKEDITOR.TRISTATE_OFF,
            i512 : CKEDITOR.TRISTATE_OFF,
			i513 : CKEDITOR.TRISTATE_OFF
          };
        }
      },
	  
	  g6 :
      {
        label : 'Other',
        group : 'g6',
        getItems : function() {
          return {
            i61 : CKEDITOR.TRISTATE_OFF,
            i62 : CKEDITOR.TRISTATE_OFF,
            i63 : CKEDITOR.TRISTATE_OFF,
			i64 : CKEDITOR.TRISTATE_OFF,
			i65 : CKEDITOR.TRISTATE_OFF,
			i66 : CKEDITOR.TRISTATE_OFF,
			i67 : CKEDITOR.TRISTATE_OFF,
            i68 : CKEDITOR.TRISTATE_OFF
          };
        }
      },

      i11 :
      {
          label : 'Subscriber First Name',
          group : 'g1',
          command : 'c1'
      },

      i12 :
      {
          label : 'Subscriber Last Name',
          group : 'g1',
          command : 'c2'
      },

      i13 :
      {
          label : 'Subscriber Email Address',
          group : 'g1',
          command : 'c3'
      },

      i14 :
      {
          label : 'Subscriber Full Name',
          group : 'g1',
          command : 'c4'
      },

      i15 :
      {
          label : 'Subscriber Age',
          group : 'g1',
          command : 'c5'
      },

      i16 :
      {
          label : 'Subscriber Username [username(@)email.com]',
          group : 'g1',
          command : 'c6'
      },

      i17 :
      {
          label : 'Subscriber Address Street',
          group : 'g1',
          command : 'c7'
      },

      i18 :
      {
          label : 'Subscriber Address State',
          group : 'g1',
          command : 'c8'
      },

      i19 :
      {
          label : 'Subscriber Address City',
          group : 'g1',
          command : 'c9'
      },


      i110 :
      {
          label : 'Subscriber Address Country',
          group : 'g1',
          command : 'c10'
      },

      i111 :
      {
          label : 'Subscriber Address Zip',
          group : 'g1',
          command : 'c11'
      },

      // 2.2 Now add the child items to the group.
      /*
      i11 :
      {
        label : 'Bounce Type',
        group : 'g1',
        command : 'c1'
      },

      i12 :
      {
        label : 'Custom Field: ADDRESS (Global)',
        group : 'g1',
        command : 'c2'
      },

      i13 :
      {
        label : 'Custom Field: CITY (Global)',
        group : 'g1',
        command : 'c3'
      },
	  
	  i14 :
      {
        label : 'Custom Field: DOB (Global)',
        group : 'g1',
        command : 'c4'
      },
	  
	  i15 :
      {
        label : 'Custom Field: FNAME (Global)',
        group : 'g1',
        command : 'c5'
      },
	  
	  i16 :
      {
        label : 'Custom Field: GENDER (Global)',
        group : 'g1',
        command : 'c6'
      },
	  
	  i17 :
      {
        label : 'Custom Field: HOME_OWNER (Global)',
        group : 'g1',
        command : 'c7'
      },
	  
	  i18 :
      {
        label : 'Custom Field: IP (Global)',
        group : 'g1',
        command : 'c8'
      },
	  
	  i19 :
      {
        label : 'Custom Field: JOIN_DATE (Global)',
        group : 'g1',
        command : 'c9'
      },
	  
	  i110 :
      {
        label : 'Custom Field: LNAME (Global)',
        group : 'g1',
        command : 'c10'
      },
	  
	  i111 :
      {
        label : 'Custom Field: PHONE (Global)',
        group : 'g1',
        command : 'c11'
      },
	  
	  i112 :
      {
        label : 'Custom Field: STATE (Global)',
        group : 'g1',
        command : 'c12'
      },
	  
	  i113 :
      {
        label : 'Custom Field: URL (Global)',
        group : 'g1',
        command : 'c13'
      },
	  
	  i114 :
      {
        label : 'Custom Field: ZIP (Global)',
        group : 'g1',
        command : 'c14'
      },
	  
	  i115 :
      {
        label : 'EmailAddress',
        group : 'g1',
        command : 'c15'
      },
	  
	  i116 :
      {
        label : 'EmailAddressHash',
        group : 'g1',
        command : 'c16'
      },
	  
	  i117 :
      {
        label : 'Opt-In Date',
        group : 'g1',
        command : 'c17'
      },
	  
	  i118 :
      {
        label : 'Subscriber ID',
        group : 'g1',
        command : 'c18'
      },
	  
	  i119 :
      {
        label : 'Subscription date',
        group : 'g1',
        command : 'c19'
      },
	  
	  i120 :
      {
        label : 'Subscription IP',
        group : 'g1',
        command : 'c20'
      },
	  
	  i121 :
      {
        label : 'Subscription status',
        group : 'g1',
        command : 'c21'
      },
	  
	  i122 :
      {
        label : 'Suppressed',
        group : 'g1',
        command : 'c22'
      },
	  
	  i123 :
      {
        label : 'Unsubscription date',
        group : 'g1',
        command : 'c23'
      },
	  
	  i124 :
      {
        label : 'Unsubscription IP',
        group : 'g1',
        command : 'c24'
      },
	  
	  i125 :
      {
        label : 'isClicker',
        group : 'g1',
        command : 'c25'
      },
	  
	  i126 :
      {
        label : 'isDeliverable',
        group : 'g1',
        command : 'c26'
      },
	  
	  i127 :
      {
        label : 'isOpener',
        group : 'g1',
        command : 'c27'
      },
	  
	  i128 :
      {
        label : 'Conditional Personalization',
        group : 'g1',
        command : 'c28'
      },*/
	  /*
	  i21 :
      {
        label : 'Fordward to friend link',
        group : 'g2',
        command : 'c29'
      },
	  
	  i22 :
      {
        label : 'View in web browser link',
        group : 'g2',
        command : 'c30'
      },
	  
	  i23 :
      {
        label : 'Report abuse link',
        group : 'g2',
        command : 'c31'
      },
	  
	  i24 :
      {
        label : 'Twitter share link',
        group : 'g2',
        command : 'c32'
      },
	  
	  i25 :
      {
        label : 'Facebook share link',
        group : 'g2',
        command : 'c33'
      },
	  
	  i26 :
      {
        label : 'Remote content',
        group : 'g2',
        command : 'c34'
      },*/
	  
	  i31 :
      {
        label : 'Unsubscription link',
        group : 'g3',
        command : 'c35'
      },
	  /*
	  i32 :
      {
        label : 'Subscriber area link',
        group : 'g3',
        command : 'c36'
      },
	  
	  i41 :
      {
        label : 'List ID',
        group : 'g4',
        command : 'c37'
      },
	  
	  i42 :
      {
        label : 'List name',
        group : 'g4',
        command : 'c38'
      },*/
	  /*
	  i51 :
      {
        label : 'First name',
        group : 'g5',
        command : 'c39'
      },
	  
	  i52 :
      {
        label : 'Last name',
        group : 'g5',
        command : 'c40'
      },
	  
	  i53 :
      {
        label : 'Email Address',
        group : 'g5',
        command : 'c41'
      },
	  
	  i54 :
      {
        label : 'Company name',
        group : 'g5',
        command : 'c42'
      },
	  
	  i55 :
      {
        label : 'Website URL',
        group : 'g5',
        command : 'c43'
      },
	  
	  i56 :
      {
        label : 'Street',
        group : 'g5',
        command : 'c44'
      },
	  
	  i57 :
      {
        label : 'City',
        group : 'g5',
        command : 'c45'
      },
	  
	  i58 :
      {
        label : 'State',
        group : 'g5',
        command : 'c46'
      },
	  
	  i59 :
      {
        label : 'ZIP',
        group : 'g5',
        command : 'c47'
      },
	  
	  i510 :
      {
        label : 'Country',
        group : 'g5',
        command : 'c48'
      },
	  
	  i511 :
      {
        label : 'Phone',
        group : 'g5',
        command : 'c49'
      },
	  
	  i512 :
      {
        label : 'Fax',
        group : 'g5',
        command : 'c50'
      },
	  
	  i513 :
      {
        label : 'Time zone',
        group : 'g5',
        command : 'c51'
      },*/
	  
	  i61 :
      {
        label : 'Email delivery date',
        group : 'g6',
        command : 'c52'
      },
	  
	  i62 :
      {
        label : 'Email send date',
        group : 'g6',
        command : 'c53'
      },
	  
	  i63 :
      {
        label : 'Email send long date',
        group : 'g6',
        command : 'c54'
      },
	  
	  i64 :
      {
        label : 'Email send date year',
        group : 'g6',
        command : 'c55'
      },
	  
	  i65 :
      {
        label : 'Email send long date year',
        group : 'g6',
        command : 'c56'
      },
	  
	  i66 :
      {
        label : 'Email send time',
        group : 'g6',
        command : 'c57'
      },
	  
	 /* i67 :
      {
        label : 'Email user of the recipient',
        group : 'g6',
        command : 'c58'
      },*/

      i68:
      {
          label : 'Email Address check sum',
          group : 'g6',
          command : 'c59'
      }
  });
}

if (editor.contextMenu) {
  editor.contextMenu.addListener(function(element, selection) {
    return {
      g1 : CKEDITOR.TRISTATE_OFF,
	  g2 : CKEDITOR.TRISTATE_OFF,
	  g3 : CKEDITOR.TRISTATE_OFF,
	  g4 : CKEDITOR.TRISTATE_OFF,
	  g5 : CKEDITOR.TRISTATE_OFF,
	  g6 : CKEDITOR.TRISTATE_OFF
    };
  });
}
	}
});

