CKEDITOR.dialog.add( 'injectorlinksDialog', function ( editor ) {
	return {
		title: 'Generate Links with Custom Variables',
		minWidth: 500,
		minHeight: 200,

		contents: [
			{
				id: 'generatelinks',
				label: 'Add Link',
				elements: [
					{
						type: 'html',
						id: 'custom_link_heading',
						html: '<p><strong>You can generate links here with custom variables.</strong></p>'
					},
					{
						type: 'text',
						id: 'custom_link_title',
						label: 'Link Text',
						validate: CKEDITOR.dialog.validate.notEmpty("Link Text cannot be empty"),
						commit: function( data ) {
							data._title = this.getValue();
						}
					},
					{
						type: 'vbox',
						width: '500px',
						children: [
							{
								type: 'hbox',
								widths: ['20%', '80%'],
								children: [
									{
										type : 'select',
										id : 'custom_link_protocol',
										label : 'Protocl',
										"default": "http://",
										items : [
											[ 'http://', 'http://' ],
											[ 'https://', 'https://' ]
										],
										commit:function( data ){
											data.protocol = this.getValue();
										}
									},
									{
										type: 'text',
										id: 'custom_link',
										label: 'URL',
										validate: CKEDITOR.dialog.validate.notEmpty("URL cannot be empty"),
										commit: function( data ) {
											data.url = this.getValue();
											data._target = '_blank';
										}
									}
								]
							},
							{
								type : 'select',
								id : 'custom_link_options',
								label : 'Custom Variables',
								multiple: true,
								style: 'min-height: 150px; min-width: 500px; width: 100%;',
								validate: CKEDITOR.dialog.validate.notEmpty("Custom variables cannot be empty"),
								items : [
									[ 'First Name', 'f=%Subscriber:FirstName%' ],
									[ 'Last Name', 'l=%Subscriber:LastName%' ],
									[ 'Full Name', 'n=%Subscriber:FullName%' ],
									[ 'Username', 'u=%Subscriber:Username%' ],
									[ 'Email Address', 'e=%Subscriber:EmailAddress%' ],
									[ 'City', 'c=%Subscriber:City%' ],
									[ 'State', 's=%Subscriber:State%' ],
									[ 'Zip', 'z=%Subscriber:Zip%' ],
									[ 'Country', 'o=%Subscriber:County%' ],
								],
								commit : function( data ) {
									data.style = this.getValue();
									data.final_url = this.getElement().getDocument().getById('final_url').getValue();
								},
								onChange: function( data ) {
									_generateLinksAccordingToInputANDSelection(this, 'onChange');

									// this = CKEDITOR.ui.dialog.select
									/*
									var dlg = this.getDialog(),
										title = dlg.getContentElement('generatelinks', 'custom_link_title').getValue(),
										protocl = dlg.getContentElement('generatelinks', 'custom_link_protocol').getValue(),
										url = dlg.getContentElement('generatelinks', 'custom_link').getValue(),
										selectList = this.getInputElement().$,
										customVariables = selectList.getAttribute('id'),
										opt = document.getElementById(customVariables),
										doc = this.getElement().getDocument();

									if( (typeof title!=='undefined' && title!='') || (typeof url!=='undefined' && url!='') ){
										var selected = new Array();
										for(var i=0; i<opt.length; i++ ){
											if( opt.options[i].selected ){
												selected.push(opt.options[i].value);
											}
										}
										if( selected.length ){
											var new_url = '',
												final_url = '';
											for(index in selected){
												new_url += selected[index] + '&'
											}
											if( url.indexOf('?') != -1 ){
												var c_url = url.split('?');
												if( typeof c_url[1]!=='undefined' && c_url[1]!='' ){
													final_url = url + '&' + new_url;
												}else{
													final_url = url + new_url;
												}
											}else{
												final_url = url + '?' + new_url;
											}

											if( final_url.indexOf('://') != -1 ){
												final_url = final_url.split('://')[1];
											}
											final_url = protocl + final_url.slice('&', -1);
											console.log(final_url);
											doc.getById('final_url').setValue(final_url);
											doc.getById('generated_url').setHtml('<p><strong>Generated URL</strong></p> <p style="padding: 10px;">'+final_url+'</p> <br> <p><strong>Final Link</strong></p> <p style="padding: 10px;"><a href="'+final_url+'" target="_blank" style="cursor: pointer;">'+title+'</a> </p>');
										}	else {
											console.log('None of the custom variables is selected.');
										}
									}else{
										alert('Please enter Link Text and URL first are then select custom field variables.');
										for(var i=0; i<opt.length; i++ ){
											if( opt.options[i].selected ){
												opt.options[i].selected = false;
											}
										}
									}
									*/
								}
							},
							{
								id: 'custom_html',
								type: 'html',
								html: '<input type="hidden" id="final_url" /> \
								<div id="generated_url" style="max-width: 500px; overflow: auto;"></div>'
							}
						]
					}
				]
			}
		],
		onShow: function() {
			_popuplateFieldsOnLoad(this, editor, CKEDITOR.plugins.link);
			_generateLinksAccordingToInputANDSelection(this, 'onShow');
		},

		onOk: function() {
			var dialog = this,
				data = {},
				link = editor.document.createElement('a');

			this.commitContent(data);

			link.setAttribute('href', data.final_url);
			link.setAttribute('target', data._target);
			link.setHtml( data._title );

			editor.insertElement( link );
		}
	};
});

function _popuplateFieldsOnLoad(dlg, editor, link_plugin){
	var selection = editor.getSelection(),
		opt = $('.cke_dialog_ui_vbox_child').find('select:last'),
		link = null,
		text = null,
		list_id = null;

	(link=link_plugin.getSelectedLink(editor))&&link.hasAttribute("href")?selection.getSelectedElement()||selection.selectElement(link):link=null;
	text = ( link != null ) ? selection.getSelectedText() : null;

	dlg.getContentElement('generatelinks', 'custom_link_title').setValue('');
	dlg.getContentElement('generatelinks', 'custom_link_protocol').setValue('');
	$('#final_url').val('');
	$('#generated_url').html('');

	if( opt.length ){
		list_id = opt.attr('id');
		$("#"+list_id+" option").each(function(){
			$(this).prop("selected", false);
		});
	}

	if( link != null && link.hasAttribute("href") ){
		link = link_plugin.parseLinkAttributes(editor, link);
		var protocol = link.url.protocol,
			url = link.url.url;

		if( text != '' ){
			dlg.getContentElement('generatelinks', 'custom_link_title').setValue(text);
		}
		if( protocol != '' ){
			dlg.getContentElement('generatelinks', 'custom_link_protocol').setValue(protocol);
		}

		if( url != '' ){
			var c_url = url.split('?'),
				url_parts = '';
			if( typeof c_url[1] !== 'undefined' && c_url[1] != '' ){
				var _url = c_url[1].split('&'),
					match = new Array();

				if( list_id != null ){
					$.each(_url, function(i,e){
						$("#"+list_id+" option[value='" + e + "']").prop("selected", true);
					});

					$("#"+list_id+" option").each(function(){
						match.push($(this).val());
					});
				}

				for(index in _url){
					if( match.indexOf(_url[index]) != -1 ){ }else{
						url_parts += _url[index] + '&';
					}
				}
			}

			if( url_parts != '' ){
				url = c_url[0] + '?' + url_parts.slice('&', -1);
			}else{
				if( typeof c_url[0] !== 'undefined' && c_url[0] != '' ){
					url = c_url[0];
				}
			}

			dlg.getContentElement('generatelinks', 'custom_link').setValue(url);
		}
	}else{
		text = selection.getSelectedText();
		if( text != null ){
			dlg.getContentElement('generatelinks', 'custom_link_title').setValue(text);
		}
	}
}

function _generateLinksAccordingToInputANDSelection( context, func ){
	if( func == 'onChange' ){
		var dlg = context.getDialog();
	}else if( func == 'onShow' ){
		var dlg = context;
	}
	var title = dlg.getContentElement('generatelinks', 'custom_link_title').getValue(),
		protocl = dlg.getContentElement('generatelinks', 'custom_link_protocol').getValue(),
		url = dlg.getContentElement('generatelinks', 'custom_link').getValue(),
		opt = $('.cke_dialog_ui_vbox_child').find('select:last'),
		selected = new Array();

	if( opt.length ){
		$('#'+opt.attr('id')+' option').each(function(){
			if( $(this).is(':selected') ){
				selected.push($(this).val());
			}
		});
	}

	if( selected.length ){
		if( (typeof title!=='undefined' && title!='') || (typeof url!=='undefined' && url!='') ){
			var new_url = '',
				final_url = '';
			for(index in selected){
				new_url += selected[index] + '&'
			}
			if( url.indexOf('?') != -1 ){
				var c_url = url.split('?');
				if( typeof c_url[1]!=='undefined' && c_url[1]!='' ){
					final_url = url + '&' + new_url;
				}else{
					final_url = url + new_url;
				}
			}else{
				final_url = url + '?' + new_url;
			}

			if( final_url.indexOf('://') != -1 ){
				final_url = final_url.split('://')[1];
			}
			final_url = protocl + final_url.slice('&', -1);

			$('#final_url').val(final_url);
			$('#generated_url').html('<p><strong>Generated URL</strong></p> <p style="padding: 10px;">'+final_url+'</p> <br> <p><strong>Final Link</strong></p> <p style="padding: 10px;"><a href="'+final_url+'" target="_blank" style="cursor: pointer;">'+title+'</a> </p>');
		}else{
			alert('Please enter Link Text and URL first are then select custom field variables.');
			if( opt.length ){
				$('#'+opt.attr('id')+' option').each(function(){
					$(this).prop('selected', false);
				});
			}
		}
	}

	/*if( (typeof title!=='undefined' && title!='') || (typeof url!=='undefined' && url!='') ){
		if( selected.length ){

		}	else {
			console.log('None of the custom variables is selected.');
		}
	}else{
		alert('Please enter Link Text and URL first are then select custom field variables.');
		if( opt.length ){
			$('#'+opt.attr('id')+' option').each(function(){
				$(this).prop('selected', false);
			});
		}
	}*/
}
