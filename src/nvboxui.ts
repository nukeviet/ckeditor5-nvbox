/**
 * NukeViet NVBox for CKEditor5
 * @version 4.x
 * @author VINADES.,JSC <contact@vinades.vn>
 * @copyright (C) 2009-2024 VINADES.,JSC. All rights reserved
 * @license GNU/GPL version 2 or any later version
 * @see https://github.com/nukeviet The NukeViet CMS GitHub project
 */

import { Plugin } from 'ckeditor5/src/core.js';

export default class NVBoxUI extends Plugin {
    /**
     * @inheritDoc
     */
    static get pluginName() {
        return 'NVBoxUI';
    }

    /**
     * @inheritDoc
     */
    afterInit() {
        if (editor.plugins.has('ImageInsertUI')) {
            const imageInsertUI = editor.plugins.get('ImageInsertUI');
            //const command = editor.commands.get('uploadImage');
            imageInsertUI.registerIntegration({
                name: 'upload',
                //observable: command,
                buttonViewCreator: () => {
                    const uploadImageButton = editor.ui.componentFactory.create('uploadImage');
                    uploadImageButton.bind('label').to(imageInsertUI, 'isImageSelected', isImageSelected => isImageSelected ?
                        t('Replace image file manager') :
                        t('Upload image file manager'));
                    return uploadImageButton;
                },
                formViewCreator: () => {
                    const uploadImageButton = editor.ui.componentFactory.create('uploadImage');
                    uploadImageButton.withText = true;
                    uploadImageButton.bind('label').to(imageInsertUI, 'isImageSelected', isImageSelected => isImageSelected ?
                        t('Replace file manager') :
                        t('Upload file manager'));
                    uploadImageButton.on('execute', () => {
                        imageInsertUI.dropdownView.isOpen = false;
                    });
                    return uploadImageButton;
                }
            });
        }
    }
}
