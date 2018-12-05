CKEDITOR.plugins.add( 'injectorlinks', {
  icons: 'injectorlink',
  init: function( editor ) {
    editor.addCommand('openDialog', new CKEDITOR.dialogCommand('injectorlinksDialog') );

    editor.ui.addButton('InjectorLink', {
      label: 'Custom Link',
      title: 'Custom Link',
      command: 'openDialog',
      toolbar: 'styles,51'
    });

    CKEDITOR.dialog.add('injectorlinksDialog', this.path + 'dialogs/injectorlinks.js' );
  }
});
