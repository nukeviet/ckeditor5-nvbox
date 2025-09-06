/**
 * NukeViet NVBox for CKEditor5
 * @version 4.x
 * @author VINADES.,JSC <contact@vinades.vn>
 * @copyright (C) 2009-2024 VINADES.,JSC. All rights reserved
 * @license GNU/GPL version 2 or any later version
 * @see https://github.com/nukeviet The NukeViet CMS GitHub project
 */

import { Plugin } from 'ckeditor5';
import { ButtonView, MenuBarMenuListItemButtonView } from 'ckeditor5';
import { IconBrowseFiles, IconImageAssetManager } from 'ckeditor5';
import type { ImageInsertUI } from 'ckeditor5';
import type { NVMediaInsertUI } from '@nukeviet/ckeditor5-nvmedia';
import type NVBoxCommand from './nvboxcommand.js';

import mediaIcon from '../theme/icons/media-asset-manager.svg';

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
        const t = editor.locale.t;

        componentFactory.add('nvbox', locale => {
            const command: NVBoxCommand = editor.commands.get('nvbox')!;

            const button = new ButtonView(locale);

            button.set({
                label: t('Insert file from NVFileManager'),
                icon: IconBrowseFiles,
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

                // Nút chèn ảnh/đổi ảnh trên toolbar tùy đối tượng đang chọn
                buttonViewCreator: () => {
                    const button = this._createButton(ButtonView);

                    button.icon = IconImageAssetManager;
                    button.bind('label').to(imageInsertUI, 'isImageSelected', isImageSelected => isImageSelected ?
                        t('Replace image with file manager') :
                        t('Insert image with file manager')
                    );

                    return button;
                },

                // Menu thêm vào của trình chèn ảnh
                formViewCreator: () => {
                    const button = this._createButton(ButtonView);

                    button.icon = IconImageAssetManager;
                    button.withText = true;
                    button.bind('label').to(imageInsertUI, 'isImageSelected', isImageSelected => isImageSelected ?
                        t('Replace with file manager') :
                        t('Insert with file manager')
                    );

                    button.on('execute', () => {
                        imageInsertUI.dropdownView!.isOpen = false;
                    });

                    return button;
                },

                // Menu trong menubar (thanh công cụ thường thấy trên word)
                menuBarButtonViewCreator: (isOnly) => {
                    const button = this._createButton(MenuBarMenuListItemButtonView);
                    button.icon = IconImageAssetManager;
		            button.withText = true;

                    if (isOnly) {
                        button.label = t('Image');
                    } else {
                        button.label = t('By file manager');
                    }

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
                    const button = this._createButton(ButtonView);

                    button.icon = mediaIcon;
                    button.bind('label').to(mediaInsertUI, 'isMediaSelected', isMediaSelected => isMediaSelected ?
                        t('Replace media with file manager') :
                        t('Insert media with file manager')
                    );
                    button.tooltip = true;

                    return button;
                },

                formViewCreator: () => {
                    const button = this._createButton(ButtonView);

                    button.icon = mediaIcon;
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

    /**
     * Tạo nút, loại nút tùy đầu vào
     *
     * @param ButtonClass
     * @returns
     */
    private _createButton<T extends typeof ButtonView | typeof MenuBarMenuListItemButtonView>( ButtonClass: T ): InstanceType<T> {
        const editor = this.editor;
        const locale = editor.locale;
        const view = new ButtonClass(locale) as InstanceType<T>;
        const command = editor.commands.get('nvbox')!;

        view.bind('isOn', 'isEnabled').to(command, 'value', 'isEnabled');

        view.on('execute', () => {
            editor.execute('nvbox');
        });

        return view;
	}
}
