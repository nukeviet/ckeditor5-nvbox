/**
 * NukeViet NVBox for CKEditor5
 * @version 4.x
 * @author VINADES.,JSC <contact@vinades.vn>
 * @copyright (C) 2009-2024 VINADES.,JSC. All rights reserved
 * @license GNU/GPL version 2 or any later version
 * @see https://github.com/nukeviet The NukeViet CMS GitHub project
 */
import { icons, Plugin } from 'ckeditor5/src/core.js';
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
        const editor = this.editor;
        const command = editor.commands.get('nvbox');
        if (!command) {
            console.log('No command nvbox');
            return;
        }
        const t = editor.t;
        if (editor.plugins.has('ImageInsertUI')) {
            const imageInsertUI = editor.plugins.get('ImageInsertUI');
            imageInsertUI.registerIntegration({
                name: 'assetManager',
                observable: command,
                buttonViewCreator: () => {
                    const uploadImageButton = editor.ui.componentFactory.create('uploadImage');
                    uploadImageButton.bind('label').to(imageInsertUI, 'isImageSelected', isImageSelected => isImageSelected ?
                        t('Replace image file manager') :
                        t('Upload image file manager'));
                    return uploadImageButton;
                },
                formViewCreator: () => {
                    const button = this.editor.ui.componentFactory.create('uploadImage');
                    button.icon = icons.imageAssetManager;
                    button.withText = true;
                    button.bind('label').to(imageInsertUI, 'isImageSelected', isImageSelected => isImageSelected ?
                        t('Replace with file manager') :
                        t('Insert with file manager'));
                    button.on('execute', () => {
                        imageInsertUI.dropdownView.isOpen = false;
                    });
                    return button;
                }
            });
        }
    }
}
//# sourceMappingURL=nvboxui.js.map