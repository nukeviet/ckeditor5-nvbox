/**
 * @license Copyright (c) 2003-2024, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */
/* globals window */
import { Plugin } from 'ckeditor5/src/core.js';
import { logError } from 'ckeditor5/src/utils.js';
import NVBoxCommand from './nvboxcommand.js';
export default class NVBoxEditing extends Plugin {
    /**
     * @inheritDoc
     */
    static get pluginName() {
        return 'NVBoxEditing';
    }
    /**
     * @inheritDoc
     */
    static get requires() {
        return ['LinkEditing', 'PictureEditing'];
    }
    /**
     * @inheritDoc
     */
    init() {
        const editor = this.editor;
        const isLibraryLoaded = !!window.NVBox;
        // Proceed with plugin initialization only when the integrator intentionally wants to use it, i.e. when the `config.ckbox` exists or
        // the CKBox JavaScript library is loaded.
        if (!isLibraryLoaded) {
            return;
        }
        this._checkImagePlugins();
        if (isLibraryLoaded) {
            editor.commands.add('nvbox', new NVBoxCommand(editor));
        }
    }
    /**
     * Checks if at least one image plugin is loaded.
     */
    _checkImagePlugins() {
        const editor = this.editor;
        if (!editor.plugins.has('ImageBlockEditing') && !editor.plugins.has('ImageInlineEditing')) {
            /**
             * The CKBox feature requires one of the following plugins to be loaded to work correctly:
             *
             * * {@link module:image/imageblock~ImageBlock},
             * * {@link module:image/imageinline~ImageInline},
             * * {@link module:image/image~Image} (loads both `ImageBlock` and `ImageInline`)
             *
             * Please make sure your editor configuration is correct.
             *
             * @error ckbox-plugin-image-feature-missing
             * @param {module:core/editor/editor~Editor} editor
             */
            logError('ckbox-plugin-image-feature-missing', editor);
        }
    }
}
//# sourceMappingURL=nvboxediting.js.map