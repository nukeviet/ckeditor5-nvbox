/**
 * NukeViet NVBox for CKEditor5
 * @version 4.x
 * @author VINADES.,JSC <contact@vinades.vn>
 * @copyright (C) 2009-2024 VINADES.,JSC. All rights reserved
 * @license GNU/GPL version 2 or any later version
 * @see https://github.com/nukeviet The NukeViet CMS GitHub project
 */

import { icons, Plugin } from 'ckeditor5/src/core.js';
import { ButtonView } from 'ckeditor5/src/ui.js';

import type { ImageInsertUI } from '@ckeditor/ckeditor5-image';
import type { NVMediaInsertUI } from '@nukeviet/ckeditor5-nvmedia';
import type NVBoxCommand from './nvboxcommand.js';

export default class NVBoxUI extends Plugin {
    /**
     * @inheritDoc
     */
    public static get pluginName() {
        return 'NVBoxUI' as const;
    }

    /**
     * @inheritDoc
     */
    public afterInit(): void {
        const editor = this.editor;
        const componentFactory = editor.ui.componentFactory;
        const t = editor.t;

        componentFactory.add('nvbox', locale => {
            const command: NVBoxCommand = editor.commands.get('nvbox')!;

            const button = new ButtonView(locale);

            button.set({
                label: t('Insert file from NVFileManager'),
                icon: icons.browseFiles,
                tooltip: true
            });

            button.bind('isEnabled').to(command);

            button.on('execute', () => {
                editor.execute('nvbox');
                editor.editing.view.focus();
            });

            return button;
        });

        // Tích hợp chèn ảnh từ trình quản lý tập tin
        if (editor.plugins.has('ImageInsertUI')) {
            const imageInsertUI: ImageInsertUI = editor.plugins.get('ImageInsertUI');

            imageInsertUI.registerIntegration({
                name: 'assetManager',
                observable: () => editor.commands.get('nvbox')!,

                buttonViewCreator: () => {
                    const button = this.editor.ui.componentFactory.create('nvbox') as ButtonView;

                    button.icon = icons.imageAssetManager;
                    button.bind('label').to(imageInsertUI, 'isImageSelected', isImageSelected => isImageSelected ?
                        t('Replace image with file manager') :
                        t('Insert image with file manager')
                    );

                    return button;
                },

                formViewCreator: () => {
                    const button = this.editor.ui.componentFactory.create('nvbox') as ButtonView;

                    button.icon = icons.imageAssetManager;
                    button.withText = true;
                    button.bind('label').to(imageInsertUI, 'isImageSelected', isImageSelected => isImageSelected ?
                        t('Replace with file manager') :
                        t('Insert with file manager')
                    );

                    button.on('execute', () => {
                        imageInsertUI.dropdownView!.isOpen = false;
                    });

                    return button;
                }
            });
        }

        // Tích hợp chèn media từ trình quản lý tệp tin
        if (editor.plugins.has('NVMediaInsertUI')) {
            const mediaInsertUI: NVMediaInsertUI = editor.plugins.get('NVMediaInsertUI');

            mediaInsertUI.registerIntegration({
                name: 'assetManager',
                observable: () => editor.commands.get('nvbox')!,

                buttonViewCreator: () => {
                    const button = this.editor.ui.componentFactory.create('nvbox') as ButtonView;

                    button.icon = icons.imageAssetManager;
                    button.bind('label').to(mediaInsertUI, 'isMediaSelected', isMediaSelected => isMediaSelected ?
                        t('Replace media with file manager') :
                        t('Insert media with file manager')
                    );

                    return button;
                },

                formViewCreator: () => {
                    const button = this.editor.ui.componentFactory.create('nvbox') as ButtonView;

                    button.icon = icons.imageAssetManager;
                    button.withText = true;
                    button.bind('label').to(mediaInsertUI, 'isMediaSelected', isMediaSelected => isMediaSelected ?
                        t('Replace with file manager') :
                        t('Insert with file manager')
                    );

                    button.on('execute', () => {
                        mediaInsertUI.dropdownView!.isOpen = false;
                    });

                    return button;
                }
            });
        }
    }
}
